import { dlopen, suffix, FFIType } from 'bun:ffi';

const lib = `libtss2-tctildr.${suffix}`;

const { symbols } = dlopen(lib, {
  // TSS2_RC Tss2_TctiLdr_Initialize(const char *nameConf, TSS2_TCTI_CONTEXT **context);
  Tss2_TctiLdr_Initialize: {
    args: [
      FFIType.cstring, // const char *nameConf,
      FFIType.ptr, // TSS2_TCTI_CONTEXT **context
    ],

    // TSS2_RC
    returns: FFIType.u32,
  },

  // void Tss2_TctiLdr_Finalize(TSS2_TCTI_CONTEXT **context);
  Tss2_TctiLdr_Finalize: {
    args: [FFIType.ptr],

    returns: FFIType.void,
  },
});

export { symbols };
