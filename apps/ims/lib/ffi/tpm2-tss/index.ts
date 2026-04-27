import { CString, Pointer, ptr, read, toArrayBuffer } from 'bun:ffi';
import { symbols } from './symbols';
import { allocOutPtr, readPtr, readSizeT } from './utils';
import { checkResult } from './errors';

export default abstract class TPM2_TSS {
  private contextPtr: Pointer;
  private finalized: boolean = false;

  constructor(uri?: string) {
    const ctxBuf = allocOutPtr();
    const ctxBufPtr = ptr(ctxBuf);

    const uriBytes = uri ? this.toCString(uri) : null;
    const result = symbols.Fapi_Initialize(ctxBufPtr, uriBytes);
    checkResult(result);

    this.contextPtr = readPtr(ctxBuf) as Pointer;
  }

  public Fapi_Finalize(): void {
    symbols.Fapi_Finalize(ptr(this.writePointer()));
    this.contextPtr = 0 as Pointer;
    this.finalized = true;
  }

  public Fapi_GetRandom(length: number = 8): Uint8Array<ArrayBuffer> {
    const dataPtrBuf = allocOutPtr();

    symbols.Fapi_GetRandom(this.contextPtr, length, ptr(dataPtrBuf));

    const dataPtr = readPtr(dataPtrBuf) as Pointer;
    const data = new Uint8Array(toArrayBuffer(dataPtr, 0, length));
    symbols.Fapi_Free(dataPtr);

    return data;
  }

  public Fapi_Provision(authEh = '', authSh = '', lockout = ''): void {
    if (this.finalized) return;

    const result = symbols.Fapi_Provision(
      this.contextPtr,
      this.toCString(authEh),
      this.toCString(authSh),
      this.toCString(lockout)
    );
    checkResult(result);
  }

  public Fapi_CreateSeal(
    path: string,
    data: Uint8Array,
    options: {
      type?: string;
      policyPath?: string;
      authValue?: string;
    } = {}
  ): void {
    if (this.finalized) return;

    const values = {
      path: this.toCString(path),
      type: options.type ? this.toCString(options.type) : null,
      policyPath: options.policyPath
        ? this.toCString(options.policyPath)
        : null,
      authValue: options.authValue ? this.toCString(options.authValue) : null,
    };

    const res = symbols.Fapi_CreateSeal(
      this.contextPtr,
      values.path,
      values.type,
      data.byteLength,
      values.policyPath,
      values.authValue,
      ptr(data)
    );
    checkResult(res);
  }

  public Fapi_Unseal(path: string): Uint8Array<ArrayBuffer> {
    // uint_8 **data
    const dataPtrBuf = allocOutPtr();
    // size_t *size
    const sizeBuf = allocOutPtr();

    const res = symbols.Fapi_Unseal(
      this.contextPtr,
      this.toCString(path),
      ptr(dataPtrBuf),
      ptr(sizeBuf)
    );
    checkResult(res);

    const dataPtr = readPtr(dataPtrBuf) as Pointer;
    const size = readSizeT(sizeBuf);

    const raw = new Uint8Array(toArrayBuffer(dataPtr, 0, size));
    symbols.Fapi_Free(dataPtr);

    return raw;
  }

  public Fapi_PcrRead(pcrIndex: number): {
    pcrVal: Uint8Array<ArrayBuffer>;
    pcrLog: string | null;
  } {
    const pcrValBuf = allocOutPtr();
    const pcrSizeBuf = allocOutPtr();
    const pcrLogBuf = allocOutPtr();

    symbols.Fapi_PcrRead(
      this.contextPtr,
      pcrIndex,
      ptr(pcrValBuf),
      ptr(pcrSizeBuf),
      ptr(pcrLogBuf)
    );

    const pcrSize = readPtr(pcrSizeBuf);
    const pcrValPtr = readPtr(pcrSizeBuf) as Pointer;
    const pcrLogPtr = readPtr(pcrLogBuf) as Pointer;

    const pcrVal = new Uint8Array(toArrayBuffer(pcrValPtr, 0, pcrSize));
    symbols.Fapi_Free(pcrValPtr);

    let pcrLog: string | null = null;
    if (pcrLogPtr !== 0) {
      let len = 0;
      while (read.u8(pcrLogPtr, len) !== 0) len++;
      const rawLog = toArrayBuffer(pcrLogPtr, 0, len);
      pcrLog = new TextDecoder().decode(rawLog);
      symbols.Fapi_Free(pcrLogPtr);
    }

    return {
      pcrVal,
      pcrLog,
    };
  }

  public Fapi_Delete(path: string): void {
    const res = symbols.Fapi_Delete(this.contextPtr, this.toCString(path));
    checkResult(res);
  }

  private writePointer(
    pointer: number = this.contextPtr
  ): Uint8Array<ArrayBufferLike> {
    const ctxBuf = allocOutPtr();
    const view = new DataView(ctxBuf.buffer);

    // little-endian
    const lo = this.contextPtr >>> 0;
    const hi = Math.floor(this.contextPtr / 0x100000000);
    view.setUint32(0, lo, true);
    view.setUint32(4, hi, true);
    return ctxBuf;
  }

  private toCString(str: string): Buffer<ArrayBuffer> {
    return Buffer.from(str + '\0');
  }
}
