import { suffix, dlopen, FFIType } from 'bun:ffi';

const lib = `libtss2-esys.${suffix}`;

const { symbols } = dlopen(lib, {
  // TSS2_RC Esys_Initialize 	( 	ESYS_CONTEXT **  	esys_context,
  // 	                            TSS2_TCTI_CONTEXT *  	tcti,
  // 	                            TSS2_ABI_VERSION *  	abiVersion
  //                          )
  Esys_Initialize: {
    args: [
      FFIType.ptr, // [out] esys_context The ESYS_CONTEXT.
      FFIType.ptr, // [in] tcti	 The TCTI context used to connect to the TPM (may be NULL).
      FFIType.ptr, // [in,out] abiVersion The abi version to check and the abi version supported by this implementation (may be NULL).
    ],

    // TSS2_RC
    returns: FFIType.u32,
  },

  // TSS2_RC Esys_Create 	( 	ESYS_CONTEXT *  	esysContext,
  // 	                        ESYS_TR  	parentHandle,
  // 	                        ESYS_TR  	shandle1,
  // 	                        ESYS_TR  	shandle2,
  // 	                        ESYS_TR  	shandle3,
  // 	                        const TPM2B_SENSITIVE_CREATE *  	inSensitive,
  // 	                        const TPM2B_PUBLIC *  	inPublic,
  // 	                        const TPM2B_DATA *  	outsideInfo,
  // 	                        const TPML_PCR_SELECTION *  	creationPCR,
  // 	                        TPM2B_PRIVATE **  	outPrivate,
  // 	                        TPM2B_PUBLIC **  	outPublic,
  // 	                        TPM2B_CREATION_DATA **  	creationData,
  // 	                        TPM2B_DIGEST **  	creationHash,
  // 	                        TPMT_TK_CREATION **  	creationTicket
  //                      )
  Esys_Create: {
    args: [
      FFIType.ptr, // [in,out]	esysContext	The ESYS_CONTEXT.
      FFIType.u32, // [in]	parentHandle	Handle of parent for new object.
      FFIType.u32, // [in]	shandle1	Session handle for authorization of parentHandle
      FFIType.u32, // [in]	shandle2	Second session handle.
      FFIType.u32, // [in]	shandle3	Third session handle.
      FFIType.ptr, // [in]	inSensitive	The sensitive data.
      FFIType.ptr, // [in]	inPublic	The public template.
      FFIType.ptr, // [in]	outsideInfo	Data that will be included in the creation data for this object to provide permanent, verifiable linkage between this object and some object owner data.
      FFIType.ptr, // [in]	creationPCR	PCR that will be used in creation data.
      FFIType.ptr, // [out]	outPrivate	The private portion of the object. (callee-allocated)
      FFIType.ptr, // [out]	outPublic	The public portion of the created object. (callee-allocated)
      FFIType.ptr, // [out]	creationData	Contains a TPMS_CREATION_DATA. (callee-allocated)
      FFIType.ptr, // [out]	creationHash	Digest of creationData using nameAlg of outPublic. (callee-allocated)
      FFIType.ptr, // [out]	creationTicket	Ticket used by TPM2_CertifyCreation() to validate that the creation data was produced by the TPM. (callee-allocated)
    ],

    // TSS2_RC
    returns: FFIType.u32,
  },

  // TSS2_RC 	Esys_Unseal (ESYS_CONTEXT *esysContext, ESYS_TR itemHandle, ESYS_TR shandle1, ESYS_TR shandle2, ESYS_TR shandle3, TPM2B_SENSITIVE_DATA **outData)
  Esys_Unseal: {
    args: [
      FFIType.ptr, // [in,out]	esysContext	The ESYS_CONTEXT.
      FFIType.u32, // [in]	itemHandle	Handle of a loaded data object.
      FFIType.u32, // [in]	shandle1	Session handle for authorization of itemHandle
      FFIType.u32, // [in]	shandle2	Second session handle.
      FFIType.u32, // [in]	shandle3	Third session handle.
      FFIType.ptr, // [out]	outData	Unsealed data. (callee-allocated)
    ],

    // TSS2_RC
    returns: FFIType.u32,
  },

  // TSS2_RC 	Esys_GetRandom (ESYS_CONTEXT *esysContext, ESYS_TR shandle1, ESYS_TR shandle2, ESYS_TR shandle3, UINT16 bytesRequested, TPM2B_DIGEST **randomBytes)
  Esys_GetRandom: {
    args: [
      FFIType.ptr, // [in,out]	esysContext	The ESYS_CONTEXT.
      FFIType.u32, // [in]	shandle1	First session handle.
      FFIType.u32, // [in]	shandle2	Second session handle.
      FFIType.u32, // [in]	shandle3	Third session handle.
      FFIType.u16, // [in]	bytesRequested	Number of octets to return.
      FFIType.ptr, // [out]	randomBytes	The random octets. (callee-allocated)
    ],

    // TSS2_RC
    returns: FFIType.u32,
  },

  // void Esys_Free(void *ptr)
  Esys_Free: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },

  // TSS2_RC 	Esys_Load (ESYS_CONTEXT *esysContext, ESYS_TR parentHandle, ESYS_TR shandle1, ESYS_TR shandle2, ESYS_TR shandle3, const TPM2B_PRIVATE *inPrivate, const TPM2B_PUBLIC *inPublic, ESYS_TR *objectHandle)
  Esys_Load: {
    args: [
      FFIType.ptr, // [in,out]	esysContext	The ESYS_CONTEXT.
      FFIType.u32, // [in]	parentHandle	TPM handle of parent key; shall not be a reserved handle.
      FFIType.u32, // [in]	shandle1	Session handle for authorization of parentHandle
      FFIType.u32, // [in]	shandle2	Second session handle.
      FFIType.u32, // [in]	shandle3	Third session handle.
      FFIType.ptr, // [in]	inPrivate	The private portion of the object.
      FFIType.ptr, // [in]	inPublic	The public portion of the object.
      FFIType.ptr, // [out]	objectHandle	ESYS_TR handle of ESYS resource for TPM2_HANDLE.
    ],

    // TSS2_RC
    returns: FFIType.u32,
  },

  // TSS2_RC 	Esys_FlushContext (ESYS_CONTEXT *esysContext, ESYS_TR flushHandle)
  Esys_FlushContext: {
    args: [
      FFIType.ptr, // [in,out]	esysContext	The ESYS_CONTEXT.
      FFIType.u32, // [in]	flushHandle	The handle of the item to flush.
    ],

    // TSS2_RC
    returns: FFIType.u32,
  },

  // void Esys_Finalize(ESYS_CONTEXT **esys_context)
  Esys_Finalize: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
});

export { symbols };
