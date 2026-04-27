import { dlopen, suffix, FFIType } from 'bun:ffi';

const path = import.meta.env.IMS_TSS2_FAPI_LIB ?? `libtss2-fapi.${suffix}`;

const { symbols } = dlopen(path, {
  // TSS2_RC 	Fapi_Initialize (FAPI_CONTEXT **context, char const *uri)
  Fapi_Initialize: {
    args: [
      FFIType.ptr, // [out]	context	The FAPI_CONTEXT
      FFIType.cstring, // [in]	uri	Unused in this version of the FAPI. Must be NULL
    ],

    // TSS2_RC_SUCCESS	if the function call was a success.
    // TSS2_FAPI_RC_BAD_REFERENCE	if context is NULL.
    // TSS2_FAPI_RC_BAD_VALUE	if uri is not NULL.
    // TSS2_FAPI_RC_IO_ERROR	if the data cannot be saved.
    // TSS2_FAPI_RC_MEMORY	if the FAPI cannot allocate enough memory for internal operations or return parameters.
    // TSS2_FAPI_RC_TRY_AGAIN	if an I/O operation is not finished yet and this function needs to be called again.
    // TSS2_FAPI_RC_BAD_SEQUENCE	if the context has an asynchronous operation already pending.
    // TSS2_FAPI_RC_GENERAL_FAILURE	if an internal error occurred.
    // TSS2_FAPI_RC_BAD_PATH	if a path is used in inappropriate context or contains illegal characters.
    // TSS2_ESYS_RC_*	possible error codes of ESAPI.
    returns: FFIType.u32,
  },

  // void 	Fapi_Finalize (FAPI_CONTEXT **context)
  Fapi_Finalize: {
    // [in]	context	The FAPI_CONTEXT
    args: [FFIType.ptr],
    returns: FFIType.void,
  },

  // void 	Fapi_Free (void *ptr)
  Fapi_Free: {
    // [in]	ptr	A pointer to the object that is to be freed.
    args: [FFIType.ptr],
    returns: FFIType.void,
  },

  // TSS2_RC 	Fapi_GetRandom (FAPI_CONTEXT *context, size_t numBytes, uint8_t **data)
  Fapi_GetRandom: {
    args: [
      FFIType.ptr, // [in,out]	context	The FAPI_CONTEXT
      FFIType.uint32_t, // [in]	numBytes	The number of bytes requested from the TPM
      FFIType.ptr, // [out]	data	The array of random bytes returned from the TPM
    ],

    // TSS2_RC_SUCCESS	if the function call was a success.
    // TSS2_FAPI_RC_BAD_REFERENCE	if context or data is NULL.
    // TSS2_FAPI_RC_BAD_CONTEXT	if context corruption is detected.
    // TSS2_FAPI_RC_BAD_VALUE	if numBytes is 0.
    // TSS2_FAPI_RC_BAD_SEQUENCE	if the context has an asynchronous operation already pending.
    // TSS2_FAPI_RC_IO_ERROR	if the data cannot be saved.
    // TSS2_FAPI_RC_MEMORY	if the FAPI cannot allocate enough memory for internal operations or return parameters.
    // TSS2_FAPI_RC_NO_TPM	if FAPI was initialized in no-TPM-mode via its config file.
    // TSS2_FAPI_RC_PATH_NOT_FOUND	if a FAPI object path was not found during authorization.
    // TSS2_FAPI_RC_KEY_NOT_FOUND	if a key was not found.
    // TSS2_FAPI_RC_TRY_AGAIN	if an I/O operation is not finished yet and this function needs to be called again.
    // TSS2_FAPI_RC_GENERAL_FAILURE	if an internal error occurred.
    // TSS2_FAPI_RC_AUTHORIZATION_UNKNOWN	if a required authorization callback is not set.
    // TSS2_FAPI_RC_AUTHORIZATION_FAILED	if the authorization attempt fails.
    // TSS2_FAPI_RC_POLICY_UNKNOWN	if policy search for a certain policy digest was not successful.
    // TSS2_ESYS_RC_*	possible error codes of ESAPI.
    // TSS2_FAPI_RC_NOT_PROVISIONED	FAPI was not provisioned.
    // TSS2_FAPI_RC_BAD_PATH	if the path is used in inappropriate context or contains illegal characters.
    returns: FFIType.u32,
  },

  // TSS2_RC 	Fapi_Provision (FAPI_CONTEXT *context, char const *authValueEh, char const *authValueSh, char const *authValueLockout)
  Fapi_Provision: {
    // [in,out]	context	The FAPI_CONTEXT.
    // [in]	authValueEh	The authorization value for the endorsement hierarchy. May be NULL
    // [in]	authValueSh	The authorization value for the storage hierarchy. Should be NULL
    // [in]	authValueLockout	The authorization value for lockout.
    args: [FFIType.ptr, FFIType.cstring, FFIType.cstring, FFIType.cstring],

    // TSS2_RC_SUCCESS	if the function call was a success.
    // TSS2_FAPI_RC_BAD_REFERENCE	if context is NULL.
    // TSS2_FAPI_RC_BAD_CONTEXT	if context corruption is detected.
    // TSS2_FAPI_RC_BAD_SEQUENCE	if the context has an asynchronous operation already pending.
    // TSS2_FAPI_RC_NO_CERT	if no certificate was found for the computed EK.
    // TSS2_FAPI_RC_BAD_KEY	if public key of the EK does not match the configured certificate or the configured fingerprint does not match the computed EK.
    // TSS2_FAPI_RC_IO_ERROR	if the data cannot be saved.
    // TSS2_FAPI_RC_MEMORY	if the FAPI cannot allocate enough memory for internal operations or return parameters.
    // TSS2_FAPI_RC_NO_TPM	if FAPI was initialized in no-TPM-mode via its config file.
    // TSS2_FAPI_RC_TRY_AGAIN	if an I/O operation is not finished yet and this function needs to be called again.
    // TSS2_FAPI_RC_BAD_VALUE	if an invalid value was passed into the function.
    // TSS2_FAPI_RC_AUTHORIZATION_UNKNOWN	if a required authorization callback is not set.
    // TSS2_FAPI_RC_AUTHORIZATION_FAILED	if the authorization attempt fails.
    // TSS2_FAPI_RC_GENERAL_FAILURE	if an internal error occurred.
    // TSS2_FAPI_RC_POLICY_UNKNOWN	if policy search for a certain policy digest was not successful.
    // TSS2_FAPI_RC_PATH_NOT_FOUND	if a FAPI object path was not found during authorization.
    // TSS2_FAPI_RC_KEY_NOT_FOUND	if a key was not found.
    // TSS2_ESYS_RC_*	possible error codes of ESAPI.
    // TSS2_FAPI_RC_BAD_PATH	if the path is used in inappropriate context or contains illegal characters.
    // TSS2_FAPI_RC_NOT_PROVISIONED	FAPI was not provisioned.
    // TSS2_FAPI_RC_PATH_ALREADY_EXISTS	if the object already exists in object store.
    returns: FFIType.u32,
  },

  // TSS2_RC 	Fapi_CreateSeal (FAPI_CONTEXT *context, char const *path, char const *type, size_t size, char const *policyPath, char const *authValue, uint8_t const *data)
  Fapi_CreateSeal: {
    args: [
      FFIType.ptr, // [in,out]	context	The FAPI_CONTEXT
      FFIType.cstring, // [in]	path	The path to the new sealed object
      FFIType.cstring, // [in]	type	The type of the new sealed object. May be NULL
      FFIType.u64, // [in]	size	The size of the new sealed object. Must not be 0
      FFIType.cstring, // [in]	policyPath	The path to the policy that is associated with the new sealed object. May be NULL
      FFIType.cstring, // [in]	authValue	The authorization value for the new sealed object. May be NULL
      FFIType.ptr, // [in]	data	The data that is to be sealed within the new object. May be NULL
    ],

    // TSS2_RC_SUCCESS	if the function call was a success.
    // TSS2_FAPI_RC_BAD_REFERENCE	if context, or path is NULL.
    // TSS2_FAPI_RC_BAD_CONTEXT	if context corruption is detected.
    // TSS2_FAPI_RC_KEY_NOT_FOUND	if the parent key does not map to a FAPI key.
    // TSS2_FAPI_RC_BAD_PATH	if policyPath is non-NULL and does not map to a FAPI key.
    // TSS2_FAPI_RC_PATH_ALREADY_EXISTS	if a sealed object already exists at path.
    // TSS2_FAPI_RC_BAD_VALUE	if the keyType is invalid.
    // TSS2_FAPI_RC_BAD_SEQUENCE	if the context has an asynchronous operation already pending.
    // TSS2_FAPI_RC_IO_ERROR	if the data cannot be saved.
    // TSS2_FAPI_RC_MEMORY	if the FAPI cannot allocate enough memory for internal operations or return parameters.
    // TSS2_FAPI_RC_NO_TPM	if FAPI was initialized in no-TPM-mode via its config file.
    // TSS2_FAPI_RC_TRY_AGAIN	if an I/O operation is not finished yet and this function needs to be called again.
    // TSS2_FAPI_RC_AUTHORIZATION_UNKNOWN	if a required authorization callback is not set.
    // TSS2_ESYS_RC_*	possible error codes of ESAPI.
    // TSS2_FAPI_RC_PATH_NOT_FOUND	if a FAPI object path was not found during authorization.
    // TSS2_FAPI_RC_GENERAL_FAILURE	if an internal error occured.
    // TSS2_FAPI_RC_NOT_PROVISIONED	FAPI was not provisioned.
    // TSS2_FAPI_RC_AUTHORIZATION_FAILED	if the authorization attempt fails.
    // TSS2_FAPI_RC_POLICY_UNKNOWN	if policy search for a certain policy digest was not successful.
    returns: FFIType.u32,
  },

  // TSS2_RC 	Fapi_Unseal (FAPI_CONTEXT *context, char const *path, uint8_t **data, size_t *size)
  Fapi_Unseal: {
    args: [
      FFIType.ptr, // [in,out]	context	The FAPI_CONTEXT
      FFIType.cstring, // [in]	path	The path to the sealed data
      FFIType.ptr, // [out]	data	The decrypted data after unsealing. May be NULL
      FFIType.ptr, // [out]	size	The size of data in bytes. May be NULL
    ],

    // TSS2_RC_SUCCESS	if the function call was a success.
    // TSS2_FAPI_RC_BAD_REFERENCE	if context or path is NULL.
    // TSS2_FAPI_RC_BAD_CONTEXT	if context corruption is detected.
    // TSS2_FAPI_RC_BAD_PATH	if path does not point to a sealed data object.
    // TSS2_FAPI_RC_BAD_VALUE	if the digestSize is zero.
    // TSS2_FAPI_RC_BAD_SEQUENCE	if the context has an asynchronous operation already pending.
    // TSS2_FAPI_RC_IO_ERROR	if the data cannot be saved.
    // TSS2_FAPI_RC_MEMORY	if the FAPI cannot allocate enough memory for internal operations or return parameters.
    // TSS2_FAPI_RC_NO_TPM	if FAPI was initialized in no-TPM-mode via its config file.
    // TSS2_FAPI_RC_TRY_AGAIN	if an I/O operation is not finished yet and this function needs to be called again.
    // TSS2_FAPI_RC_PATH_NOT_FOUND	if a FAPI object path was not found during authorization.
    // TSS2_FAPI_RC_KEY_NOT_FOUND	if a key was not found.
    // TSS2_FAPI_RC_GENERAL_FAILURE	if an internal error occurred.
    // TSS2_FAPI_RC_SIGNATURE_VERIFICATION_FAILED	if the signature could not be verified
    // TSS2_ESYS_RC_*	possible error codes of ESAPI.
    // TSS2_FAPI_RC_NOT_PROVISIONED	FAPI was not provisioned.
    // TSS2_FAPI_RC_AUTHORIZATION_UNKNOWN	if a required authorization callback is not set.
    // TSS2_FAPI_RC_AUTHORIZATION_FAILED	if the authorization attempt fails.
    // TSS2_FAPI_RC_POLICY_UNKNOWN	if policy search for a certain policy digest was not successful.
    returns: FFIType.u32,
  },

  // TSS2_RC 	Fapi_PcrRead (FAPI_CONTEXT *context, uint32_t pcrIndex, uint8_t **pcrValue, size_t *pcrValueSize, char **pcrLog)
  Fapi_PcrRead: {
    args: [
      FFIType.ptr, // [in,out]	context	The FAPI_CONTEXT
      FFIType.uint32_t, // [in]	pcrIndex	The index of the PCR to read
      FFIType.ptr, // [out]	pcrValue	The value of the PCR. May be NULL
      FFIType.ptr, // [out]	pcrValueSize	The size of value in bytes. May be NULL
      FFIType.ptr, // [out]	pcrLog	The PCR log. May be NULL
    ],

    // TSS2_RC_SUCCESS	if the function call was a success.
    // TSS2_FAPI_RC_BAD_REFERENCE	if context, pcrValue or pcrValueSize is NULL.
    // TSS2_FAPI_RC_BAD_CONTEXT	if context corruption is detected.
    // TSS2_FAPI_RC_BAD_VALUE	if pcrIndex is invalid.
    // TSS2_FAPI_RC_BAD_SEQUENCE	if the context has an asynchronous operation already pending.
    // TSS2_FAPI_RC_IO_ERROR	if the data cannot be saved.
    // TSS2_FAPI_RC_MEMORY	if the FAPI cannot allocate enough memory for internal operations or return parameters.
    // TSS2_FAPI_RC_NO_TPM	if FAPI was initialized in no-TPM-mode via its config file.
    // TSS2_FAPI_RC_TRY_AGAIN	if an I/O operation is not finished yet and this function needs to be called again.
    // TSS2_FAPI_RC_AUTHORIZATION_UNKNOWN	if a required authorization callback is not set.
    // TSS2_FAPI_RC_AUTHORIZATION_FAILED	if the authorization attempt fails.
    // TSS2_FAPI_RC_GENERAL_FAILURE	if an internal error occurred.
    // TSS2_FAPI_RC_POLICY_UNKNOWN	if policy search for a certain policy digest was not successful.
    // TSS2_FAPI_RC_NO_CERT	if an error did occur during certificate downloading.
    // TSS2_FAPI_RC_PATH_NOT_FOUND	if a FAPI object path was not found during authorization.
    // TSS2_FAPI_RC_KEY_NOT_FOUND	if a key was not found.
    // TSS2_ESYS_RC_*	possible error codes of ESAPI.
    returns: FFIType.u32,
  },

  // TSS2_RC 	Fapi_Delete (FAPI_CONTEXT *context, char const *path)
  Fapi_Delete: {
    args: [
      FFIType.ptr, // [in,out]	context	The ESAPI_CONTEXT
      FFIType.cstring, // [in]	path	The path to the entity that is to be deleted
    ],

    // TSS2_RC_SUCCESS	if the function call was a success.
    // TSS2_FAPI_RC_BAD_REFERENCE	if context or path is NULL.
    // TSS2_FAPI_RC_BAD_CONTEXT	if context corruption is detected.
    // TSS2_FAPI_RC_BAD_PATH	if path cannot be deleted.
    // TSS2_FAPI_RC_NOT_DELETABLE	if the entity is not deletable or the path is read-only.
    // TSS2_FAPI_RC_BAD_SEQUENCE	if the context has an asynchronous operation already pending.
    // TSS2_FAPI_RC_IO_ERROR	if the data cannot be saved.
    // TSS2_FAPI_RC_MEMORY	if the FAPI cannot allocate enough memory for internal operations or return parameters.
    // TSS2_FAPI_RC_NO_TPM	if FAPI was initialized in no-TPM-mode via its config file.
    // TSS2_FAPI_RC_PATH_NOT_FOUND	if a FAPI object path was not found during authorization.
    // TSS2_FAPI_RC_KEY_NOT_FOUND	if a key was not found.
    // TSS2_FAPI_RC_BAD_VALUE	if an invalid value was passed into the function.
    // TSS2_FAPI_RC_TRY_AGAIN	if an I/O operation is not finished yet and this function needs to be called again.
    // TSS2_FAPI_RC_GENERAL_FAILURE	if an internal error occurred.
    // TSS2_FAPI_RC_AUTHORIZATION_UNKNOWN	if a required authorization callback is not set.
    // TSS2_FAPI_RC_AUTHORIZATION_FAILED	if the authorization attempt fails.
    // TSS2_FAPI_RC_POLICY_UNKNOWN	if policy search for a certain policy digest was not successful.
    // TSS2_ESYS_RC_*	possible error codes of ESAPI.
    // TSS2_FAPI_RC_NOT_PROVISIONED	FAPI was not provisioned.
    returns: FFIType.u32,
  },
});

export { symbols };
