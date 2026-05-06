import { Pointer, ptr, toArrayBuffer } from 'bun:ffi';
import { symbols } from './symbols';
import { allocOutPtr, readPtr, writePointer } from '../utils';
import { checkResult } from '../errors';
import enums from '../enums';
import {
  TPM2B_CREATION_DATA,
  TPM2B_DATA,
  TPM2B_DIGEST,
  TPM2B_PRIVATE,
  TPM2B_PUBLIC,
  TPM2B_SENSITIVE_CREATE,
  TPM2B_SENSITIVE_DATA,
  TPML_PCR_SELECTION,
  TPMT_TK_CREATION,
  TTPM2B_DATA,
  TTPM2B_PRIVATE,
  TTPM2B_PUBLIC,
  TTPM2B_SENSITIVE_CREATE,
  TTPML_PCR_SELECTION,
} from '../structs';

/**
 * Minimal ESAPI wrapper for the subset of tpm2-tss used by IMS sealing flows.
 *
 * This class is not intended to expose the full ESAPI surface. It keeps the
 * binding focused on creating sealed objects, loading them, unsealing them,
 * requesting TPM random bytes, and releasing ESYS resources. The wrapper also
 * hides the callee-allocated pointer handling required by tpm2-tss: returned
 * TPM2B/TPMT structures are unpacked into JavaScript values and the native
 * buffers are freed before the method returns.
 *
 * The current abstraction uses the default TCTI selected by tpm2-tss and fixed
 * password/none ESYS session handles. It should be extended before being used
 * for TPM flows that need arbitrary handles, policies, sessions, or hierarchy
 * authorization.
 */
export default class TPM2_TSS_ESYS {
  /**
   * Native ESYS_CONTEXT pointer returned by `Esys_Initialize`.
   *
   * The pointer is owned by this instance and must be released with
   * {@link Esys_Finalize} when the caller is done with TPM operations.
   */
  contextPtr: Pointer | null = null;

  /**
   * Native TCTI context passed to `Esys_Initialize`.
   *
   * This wrapper currently leaves the value null so tpm2-tss resolves its
   * configured default TCTI.
   */
  tctiPtr: Pointer | null = null;

  /**
   * Initializes an ESYS context for the configured/default TPM transport.
   *
   * @throws {TPM2_TSS_ERROR} When `Esys_Initialize` returns a non-success
   * TSS2 result code.
   */
  constructor() {
    const contextBuf = allocOutPtr();

    // TSS2_RC Esys_Initialize
    const result = symbols.Esys_Initialize(
      ptr(contextBuf), // ESYS_CONTEXT **  	esys_context,
      this.tctiPtr ?? null, // TSS2_TCTI_CONTEXT *  	tcti,
      null // TSS2_ABI_VERSION *  	abiVersion
    );
    checkResult(result);

    this.contextPtr = readPtr(contextBuf) as Pointer;
  }

  /**
   * Creates a TPM object, primarily for sealing caller-provided sensitive data.
   *
   * The wrapper packs the provided TPM structures, calls `Esys_Create`, unpacks
   * the callee-allocated outputs, and frees the native output buffers. It uses
   * fixed ESYS handles suitable for the narrow sealing flow implemented here:
   * no parent handle, password authorization for the first session, and no
   * second or third session.
   *
   * @param inSensitive Sensitive create data, including optional user auth and
   * the bytes to seal.
   * @param inPublic Public object template that describes the sealed object to
   * create.
   * @param outsideInfo Caller-supplied creation information included in the
   * creation data/hash.
   * @param creationPCR PCR selection used when creating the object.
   * @returns Unpacked private/public blobs and creation attest data emitted by
   * the TPM.
   * @throws {TPM2_TSS_ERROR} When `Esys_Create` returns a non-success TSS2
   * result code.
   */
  public Esys_Create(
    inSensitive: TTPM2B_SENSITIVE_CREATE,
    inPublic: TTPM2B_PUBLIC,
    outsideInfo: TTPM2B_DATA,
    creationPCR: TTPML_PCR_SELECTION
  ) {
    const inSensitiveBuf = TPM2B_SENSITIVE_CREATE.pack(inSensitive);
    const inPublicBuf = TPM2B_PUBLIC.pack(inPublic);
    const outsideInfoBuf = TPM2B_DATA.pack(outsideInfo);
    const creationPCRBuf = TPML_PCR_SELECTION.pack(creationPCR);

    const outPrivateBuf = allocOutPtr();
    const outPublicBuf = allocOutPtr();
    const creationDataBuf = allocOutPtr();
    const creationHashBuf = allocOutPtr();
    const creationTicketBuf = allocOutPtr();

    // TSS2_RC Esys_Create
    const res = symbols.Esys_Create(
      this.contextPtr, // ESYS_CONTEXT *  	esysContext,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	parentHandle,
      enums.ESYS.ESYS_TR_PASSWORD, // ESYS_TR  	shandle1,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	shandle2,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	shandle3,
      ptr(inSensitiveBuf), // const TPM2B_SENSITIVE_CREATE *  	inSensitive,
      ptr(inPublicBuf), // const TPM2B_PUBLIC *  	inPublic,
      ptr(outsideInfoBuf), // const TPM2B_DATA *  	outsideInfo,
      ptr(creationPCRBuf), // const TPML_PCR_SELECTION *  	creationPCR,
      ptr(outPrivateBuf), // TPM2B_PRIVATE **  	outPrivate,
      ptr(outPublicBuf), // TPM2B_PUBLIC **  	outPublic,
      ptr(creationDataBuf), // TPM2B_CREATION_DATA **  	creationData,
      ptr(creationHashBuf), // TPM2B_DIGEST **  	creationHash,
      ptr(creationTicketBuf) // TPMT_TK_CREATION **  	creationTicket
    );
    checkResult(res);

    const outPrivatePtr = readPtr(outPrivateBuf) as Pointer;
    const outPublicPtr = readPtr(outPublicBuf) as Pointer;
    const creationDataPtr = readPtr(creationDataBuf) as Pointer;
    const creationHashPtr = readPtr(creationHashBuf) as Pointer;
    const creationTicketPtr = readPtr(creationTicketBuf) as Pointer;

    const outPrivate = TPM2B_PRIVATE.unpack(toArrayBuffer(outPrivatePtr));
    symbols.Esys_Free(outPrivatePtr);
    const outPublic = TPM2B_PUBLIC.unpack(toArrayBuffer(outPublicPtr));
    symbols.Esys_Free(outPublicPtr);
    const creationData = TPM2B_CREATION_DATA.unpack(
      toArrayBuffer(creationDataPtr)
    );
    symbols.Esys_Free(creationDataPtr);
    const creationHash = TPM2B_DIGEST.unpack(toArrayBuffer(creationHashPtr));
    symbols.Esys_Free(creationHashPtr);
    const creationTicket = TPMT_TK_CREATION.unpack(
      toArrayBuffer(creationTicketPtr)
    );
    symbols.Esys_Free(creationTicketPtr);

    return {
      outPrivate,
      outPublic,
      creationData,
      creationHash,
      creationTicket,
    };
  }

  /**
   * Unseals a TPM object according to this wrapper's fixed handle convention.
   *
   * This method is intentionally specialized for the local sealing flow and
   * uses the wrapper's fixed ESYS handle choices. It unpacks the TPM-owned
   * `TPM2B_SENSITIVE_DATA` result and frees the native output buffer before
   * returning.
   *
   * @returns Unpacked sensitive data produced by `Esys_Unseal`.
   * @throws {TPM2_TSS_ERROR} When `Esys_Unseal` returns a non-success TSS2
   * result code.
   */
  public Esys_Unseal() {
    const outPtrBuf = allocOutPtr();

    // TSS2_RC 	Esys_Unseal
    const res = symbols.Esys_Unseal(
      this.contextPtr, // ESYS_CONTEXT *  	esysContext,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	itemHandle,
      enums.ESYS.ESYS_TR_PASSWORD, // ESYS_TR  	shandle1,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	shandle2,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	shandle3,
      ptr(outPtrBuf) // TPM2B_SENSITIVE_DATA **outData
    );
    checkResult(res);

    const outPtr = readPtr(outPtrBuf) as Pointer;
    const out = TPM2B_SENSITIVE_DATA.unpack(toArrayBuffer(outPtr));
    symbols.Esys_Free(outPtr);

    return out;
  }

  /**
   * Requests random bytes from the TPM random number generator.
   *
   * The returned value is the unpacked `TPM2B_DIGEST` produced by ESAPI. Its
   * `size` field reflects the number of bytes actually returned by the TPM.
   *
   * @param length Number of random bytes to request. Defaults to 16.
   * @returns Unpacked `TPM2B_DIGEST` containing TPM-generated random bytes.
   * @throws {TPM2_TSS_ERROR} When `Esys_GetRandom` returns a non-success TSS2
   * result code.
   */
  public Esys_GetRandom(length: number = 16) {
    const randomBytesBuf = allocOutPtr();

    // TSS2_RC 	Esys_GetRandom
    const res = symbols.Esys_GetRandom(
      this.contextPtr, // ESYS_CONTEXT *  	esysContext,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	itemHandle,
      enums.ESYS.ESYS_TR_PASSWORD, // ESYS_TR  	shandle1,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	shandle2,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	shandle3,
      length, // UINT16 bytesRequested,
      ptr(randomBytesBuf) // TPM2B_DIGEST **randomBytes
    );
    checkResult(res);

    const randomBytesPtr = readPtr(randomBytesBuf) as Pointer;
    const randomBytes = TPM2B_DIGEST.unpack(toArrayBuffer(randomBytesPtr));
    symbols.Esys_Free(randomBytesPtr);
    return randomBytes;
  }

  /**
   * Loads a previously created TPM object from its private and public blobs.
   *
   * The blobs are packed into native TPM2B layouts and passed to `Esys_Load`.
   * The caller supplies the destination ESYS object-handle pointer value used
   * by the current abstraction.
   *
   * @param inPrivate Private blob returned by a previous create operation.
   * @param inPublic Public blob returned by a previous create operation.
   * @param handle ESYS object handle storage used by the caller's load flow.
   * @throws {TPM2_TSS_ERROR} When `Esys_Load` returns a non-success TSS2
   * result code.
   */
  public Esys_Load(
    inPrivate: TTPM2B_PRIVATE,
    inPublic: TTPM2B_PUBLIC,
    handle: number
  ) {
    const inPrivateBuf = TPM2B_PRIVATE.pack(inPrivate);
    const inPublicBuf = TPM2B_PUBLIC.pack(inPublic);

    // TSS2_RC 	Esys_Load
    const res = symbols.Esys_Load(
      this.contextPtr, // ESYS_CONTEXT *  	esysContext,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	itemHandle,
      enums.ESYS.ESYS_TR_PASSWORD, // ESYS_TR  	shandle1,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	shandle2,
      enums.ESYS.ESYS_TR_NONE, // ESYS_TR  	shandle3,
      ptr(inPrivateBuf), // const TPM2B_PRIVATE *inPrivate,
      ptr(inPublicBuf), // const TPM2B_PUBLIC *inPublic,
      handle // ESYS_TR *objectHandle
    );
    checkResult(res);
  }

  /**
   * Flushes a loaded TPM object or session from the ESYS context.
   *
   * @param handle ESYS_TR handle to release from the TPM context.
   * @throws {TPM2_TSS_ERROR} When `Esys_FlushContext` returns a non-success
   * TSS2 result code.
   */
  public Esys_FlushContext(handle: number) {
    // TSS2_RC 	Esys_FlushContext (ESYS_CONTEXT *esysContext, ESYS_TR flushHandle)
    const res = symbols.Esys_FlushContext(this.contextPtr, handle);
    checkResult(res);
  }

  /**
   * Releases the native ESYS context owned by this wrapper.
   *
   * Calling this method with no initialized context is a no-op. Callers should
   * invoke it once they have finished TPM operations to avoid leaking the
   * native ESAPI context.
   */
  public Esys_Finalize() {
    if (!this.contextPtr) return;

    // void Esys_Finalize(ESYS_CONTEXT **esys_context)
    symbols.Esys_Finalize(writePointer(this.contextPtr));
  }
}
