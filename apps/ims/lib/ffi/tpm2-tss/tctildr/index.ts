import { checkResult } from '../errors';
import { allocOutPtr, readPtr, writePointer } from '../utils';
import { symbols } from './symbols';
import type { Pointer } from 'bun:ffi';

/**
 * Minimal TCTI loader wrapper for the TPM transport used by IMS.
 *
 * This abstraction only covers loading and finalizing a tpm2-tss TCTI context.
 * It converts the caller's TCTI name/configuration string to a C string,
 * delegates initialization to `Tss2_TctiLdr_Initialize`, and stores the native
 * context pointer for later cleanup.
 */
export default class TPM2_TSS_TCTILDR {
  /**
   * Native `TSS2_TCTI_CONTEXT` pointer returned by the tpm2-tss loader.
   *
   * The pointer is owned by this instance and must be released with
   * {@link Finalize} when the transport is no longer needed.
   */
  tctiPointer: Pointer | null;

  /**
   * Loads a TCTI context for the provided tpm2-tss name/configuration string.
   *
   * Examples of accepted values depend on the installed tpm2-tss TCTI modules,
   * such as a device, mssim, swtpm, or tabrmd configuration.
   *
   * @param path TCTI loader name/configuration passed to
   * `Tss2_TctiLdr_Initialize`.
   * @throws {TPM2_TSS_ERROR} When TCTI initialization returns a non-success
   * TSS2 result code.
   */
  constructor(path: string) {
    const outBuf = allocOutPtr();

    // TSS2_RC Tss2_TctiLdr_Initialize(const char *nameConf, TSS2_TCTI_CONTEXT **context);
    const res = symbols.Tss2_TctiLdr_Initialize(this.toCString(path), outBuf);
    checkResult(res);

    this.tctiPointer = readPtr(outBuf) as Pointer;
  }

  /**
   * Releases the native TCTI context owned by this wrapper.
   *
   * Calling this method before initialization has produced a pointer is a
   * no-op. Callers should invoke it when the transport is no longer needed to
   * avoid leaking the native tpm2-tss TCTI context.
   */
  public Finalize() {
    if (!this.tctiPointer) return;

    // void Tss2_TctiLdr_Finalize(TSS2_TCTI_CONTEXT **context);
    symbols.Tss2_TctiLdr_Finalize(writePointer(this.tctiPointer));
  }

  /**
   * Converts a JavaScript string into a null-terminated C string buffer.
   *
   * @param str JavaScript string to pass to the native tpm2-tss loader.
   * @returns Buffer containing the UTF-8 string followed by a null terminator.
   */
  private toCString(str: string): Buffer<ArrayBuffer> {
    return Buffer.from(str + '\0');
  }
}
