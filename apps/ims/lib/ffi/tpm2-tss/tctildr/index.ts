import { checkResult } from '../errors';
import { allocOutPtr, readPtr, writePointer } from '../utils';
import { symbols } from './symbols';
import { Pointer } from 'bun:ffi';

export default class TPM2_TSS_TCTILDR {
  tctiPointer: Pointer | null;

  constructor(path: string) {
    const outBuf = allocOutPtr();

    // TSS2_RC Tss2_TctiLdr_Initialize(const char *nameConf, TSS2_TCTI_CONTEXT **context);
    const res = symbols.Tss2_TctiLdr_Initialize(this.toCString(path), outBuf);
    checkResult(res);

    this.tctiPointer = readPtr(outBuf) as Pointer;
  }

  public Finalize() {
    if (!this.tctiPointer) return;

    // void Tss2_TctiLdr_Finalize(TSS2_TCTI_CONTEXT **context);
    symbols.Tss2_TctiLdr_Finalize(writePointer(this.tctiPointer));
  }

  private toCString(str: string): Buffer<ArrayBuffer> {
    return Buffer.from(str + '\0');
  }
}
