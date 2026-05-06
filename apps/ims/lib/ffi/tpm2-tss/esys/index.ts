import { Pointer, ptr, toArrayBuffer } from 'bun:ffi';
import { symbols } from './symbols';
import { allocOutPtr, readPtr, readSizeT, writePointer } from '../utils';
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

export default class TPM2_TSS_ESYS {
  contextPtr: Pointer | null = null;
  tctiPtr: Pointer | null = null;

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

  public Esys_FlushContext(handle: number) {
    // TSS2_RC 	Esys_FlushContext (ESYS_CONTEXT *esysContext, ESYS_TR flushHandle)
    const res = symbols.Esys_FlushContext(this.contextPtr, handle);
    checkResult(res);
  }

  public Esys_Finalize() {
    if (!this.contextPtr) return;

    // void Esys_Finalize(ESYS_CONTEXT **esys_context)
    symbols.Esys_Finalize(writePointer(this.contextPtr));
  }
}
