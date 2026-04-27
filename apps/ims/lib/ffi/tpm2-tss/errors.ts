import enums from './enums';

export const locale: Record<number, string> = {
  [enums.TCTI.TSS2_TCTI_RC_GENERAL_FAILURE]: 'TCTI: General failure',
  [enums.TCTI.TSS2_TCTI_RC_NOT_IMPLEMENTED]: 'TCTI: Not implemented',
  [enums.TCTI.TSS2_TCTI_RC_BAD_CONTEXT]: 'TCTI: Bad context',
  [enums.TCTI.TSS2_TCTI_RC_ABI_MISMATCH]: 'TCTI: ABI mismatch',
  [enums.TCTI.TSS2_TCTI_RC_BAD_REFERENCE]: 'TCTI: Bad reference (NULL pointer)',
  [enums.TCTI.TSS2_TCTI_RC_INSUFFICIENT_BUFFER]: 'TCTI: Insufficient buffer',
  [enums.TCTI.TSS2_TCTI_RC_BAD_SEQUENCE]: 'TCTI: Bad call sequence',
  [enums.TCTI.TSS2_TCTI_RC_NO_CONNECTION]: 'TCTI: No connection',
  [enums.TCTI.TSS2_TCTI_RC_TRY_AGAIN]: 'TCTI: Try again',
  [enums.TCTI.TSS2_TCTI_RC_IO_ERROR]: 'TCTI: I/O error',
  [enums.TCTI.TSS2_TCTI_RC_BAD_VALUE]: 'TCTI: Bad value',
  [enums.TCTI.TSS2_TCTI_RC_NOT_PERMITTED]: 'TCTI: Not permitted',
  [enums.TCTI.TSS2_TCTI_RC_MALFORMED_RESPONSE]: 'TCTI: Malformed response',
  [enums.TCTI.TSS2_TCTI_RC_NOT_SUPPORTED]: 'TCTI: Not supported',
  [enums.TCTI.TSS2_TCTI_RC_MEMORY]: 'TCTI: Memory allocation failed',

  [enums.SYS.TSS2_SYS_RC_GENERAL_FAILURE]: 'SYS: General failure',
  [enums.SYS.TSS2_SYS_RC_ABI_MISMATCH]: 'SYS: ABI mismatch',
  [enums.SYS.TSS2_SYS_RC_BAD_REFERENCE]: 'SYS: Bad reference (NULL pointer)',
  [enums.SYS.TSS2_SYS_RC_INSUFFICIENT_BUFFER]: 'SYS: Insufficient buffer',
  [enums.SYS.TSS2_SYS_RC_BAD_SEQUENCE]: 'SYS: Bad call sequence',
  [enums.SYS.TSS2_SYS_RC_BAD_VALUE]: 'SYS: Bad value',
  [enums.SYS.TSS2_SYS_RC_INVALID_SESSIONS]: 'SYS: Invalid sessions',
  [enums.SYS.TSS2_SYS_RC_NO_DECRYPT_PARAM]: 'SYS: No decrypt parameter',
  [enums.SYS.TSS2_SYS_RC_NO_ENCRYPT_PARAM]: 'SYS: No encrypt parameter',
  [enums.SYS.TSS2_SYS_RC_BAD_SIZE]: 'SYS: Bad size',
  [enums.SYS.TSS2_SYS_RC_MALFORMED_RESPONSE]: 'SYS: Malformed response',
  [enums.SYS.TSS2_SYS_RC_INSUFFICIENT_CONTEXT]: 'SYS: Insufficient context',
  [enums.SYS.TSS2_SYS_RC_INSUFFICIENT_RESPONSE]: 'SYS: Insufficient response',
  [enums.SYS.TSS2_SYS_RC_INCOMPATIBLE_TCTI]: 'SYS: Incompatible TCTI',
  [enums.SYS.TSS2_SYS_RC_BAD_TCTI_STRUCTURE]: 'SYS: Bad TCTI structure',

  [enums.MU.TSS2_MU_RC_GENERAL_FAILURE]: 'MU: General failure',
  [enums.MU.TSS2_MU_RC_BAD_REFERENCE]: 'MU: Bad reference (NULL pointer)',
  [enums.MU.TSS2_MU_RC_BAD_SIZE]: 'MU: Bad size',
  [enums.MU.TSS2_MU_RC_BAD_VALUE]: 'MU: Bad value',
  [enums.MU.TSS2_MU_RC_INSUFFICIENT_BUFFER]: 'MU: Insufficient buffer',

  [enums.ESYS.TSS2_ESYS_RC_GENERAL_FAILURE]: 'ESYS: General failure',
  [enums.ESYS.TSS2_ESYS_RC_NOT_IMPLEMENTED]: 'ESYS: Not implemented',
  [enums.ESYS.TSS2_ESYS_RC_ABI_MISMATCH]: 'ESYS: ABI mismatch',
  [enums.ESYS.TSS2_ESYS_RC_BAD_REFERENCE]: 'ESYS: Bad reference (NULL pointer)',
  [enums.ESYS.TSS2_ESYS_RC_INSUFFICIENT_BUFFER]: 'ESYS: Insufficient buffer',
  [enums.ESYS.TSS2_ESYS_RC_BAD_SEQUENCE]: 'ESYS: Bad call sequence',
  [enums.ESYS.TSS2_ESYS_RC_INVALID_SESSIONS]: 'ESYS: Invalid sessions',
  [enums.ESYS.TSS2_ESYS_RC_TRY_AGAIN]: 'ESYS: Try again',
  [enums.ESYS.TSS2_ESYS_RC_IO_ERROR]: 'ESYS: I/O error',
  [enums.ESYS.TSS2_ESYS_RC_BAD_VALUE]: 'ESYS: Bad value',
  [enums.ESYS.TSS2_ESYS_RC_NO_DECRYPT_PARAM]: 'ESYS: No decrypt parameter',
  [enums.ESYS.TSS2_ESYS_RC_NO_ENCRYPT_PARAM]: 'ESYS: No encrypt parameter',
  [enums.ESYS.TSS2_ESYS_RC_BAD_SIZE]: 'ESYS: Bad size',
  [enums.ESYS.TSS2_ESYS_RC_MALFORMED_RESPONSE]: 'ESYS: Malformed response',
  [enums.ESYS.TSS2_ESYS_RC_INSUFFICIENT_CONTEXT]: 'ESYS: Insufficient context',
  [enums.ESYS.TSS2_ESYS_RC_INSUFFICIENT_RESPONSE]:
    'ESYS: Insufficient response',
  [enums.ESYS.TSS2_ESYS_RC_INCOMPATIBLE_TCTI]: 'ESYS: Incompatible TCTI',
  [enums.ESYS.TSS2_ESYS_RC_BAD_TCTI_STRUCTURE]: 'ESYS: Bad TCTI structure',
  [enums.ESYS.TSS2_ESYS_RC_MEMORY]: 'ESYS: Memory allocation failed',
  [enums.ESYS.TSS2_ESYS_RC_BAD_TR]: 'ESYS: Bad TR handle',
  [enums.ESYS.TSS2_ESYS_RC_MULTIPLE_DECRYPT_SESSIONS]:
    'ESYS: Multiple decrypt sessions',
  [enums.ESYS.TSS2_ESYS_RC_MULTIPLE_ENCRYPT_SESSIONS]:
    'ESYS: Multiple encrypt sessions',
  [enums.ESYS.TSS2_ESYS_RC_NOT_SUPPORTED]: 'ESYS: Not supported',
  [enums.ESYS.TSS2_ESYS_RC_RSP_AUTH_FAILED]:
    'ESYS: Response authorization failed',
  [enums.ESYS.TSS2_ESYS_RC_CALLBACK_NULL]: 'ESYS: Callback is NULL',

  [enums.FAPI.TSS2_FAPI_RC_GENERAL_FAILURE]: 'FAPI: General failure',
  [enums.FAPI.TSS2_FAPI_RC_NOT_IMPLEMENTED]: 'FAPI: Not implemented',
  [enums.FAPI.TSS2_FAPI_RC_BAD_REFERENCE]: 'FAPI: Bad reference (NULL pointer)',
  [enums.FAPI.TSS2_FAPI_RC_BAD_SEQUENCE]:
    'FAPI: Bad call sequence (async operation still pending?)',
  [enums.FAPI.TSS2_FAPI_RC_IO_ERROR]: 'FAPI: I/O error',
  [enums.FAPI.TSS2_FAPI_RC_BAD_VALUE]: 'FAPI: Bad value',
  [enums.FAPI.TSS2_FAPI_RC_NO_DECRYPT_PARAM]: 'FAPI: No decrypt parameter',
  [enums.FAPI.TSS2_FAPI_RC_NO_ENCRYPT_PARAM]: 'FAPI: No encrypt parameter',
  [enums.FAPI.TSS2_FAPI_RC_MEMORY]: 'FAPI: Memory allocation failed',
  [enums.FAPI.TSS2_FAPI_RC_BAD_CONTEXT]: 'FAPI: Bad context',
  [enums.FAPI.TSS2_FAPI_RC_NO_CONFIG]: 'FAPI: Config file not found',
  [enums.FAPI.TSS2_FAPI_RC_BAD_PATH]: 'FAPI: Bad path',
  [enums.FAPI.TSS2_FAPI_RC_NOT_DELETABLE]: 'FAPI: Object is not deletable',
  [enums.FAPI.TSS2_FAPI_RC_PATH_ALREADY_EXISTS]: 'FAPI: Path already exists',
  [enums.FAPI.TSS2_FAPI_RC_KEY_NOT_FOUND]: 'FAPI: Key not found',
  [enums.FAPI.TSS2_FAPI_RC_SIGNATURE_VERIFICATION_FAILED]:
    'FAPI: Signature verification failed',
  [enums.FAPI.TSS2_FAPI_RC_HASH_MISMATCH]: 'FAPI: Hash mismatch',
  [enums.FAPI.TSS2_FAPI_RC_KEY_NOT_DUPLICABLE]: 'FAPI: Key is not duplicable',
  [enums.FAPI.TSS2_FAPI_RC_PATH_NOT_FOUND]: 'FAPI: Path not found',
  [enums.FAPI.TSS2_FAPI_RC_NO_CERT]: 'FAPI: Certificate not found',
  [enums.FAPI.TSS2_FAPI_RC_NO_PCR]: 'FAPI: PCR not found',
  [enums.FAPI.TSS2_FAPI_RC_PCR_NOT_RESETTABLE]: 'FAPI: PCR is not resettable',
  [enums.FAPI.TSS2_FAPI_RC_BAD_TEMPLATE]: 'FAPI: Bad template',
  [enums.FAPI.TSS2_FAPI_RC_AUTHORIZATION_FAILED]: 'FAPI: Authorization failed',
  [enums.FAPI.TSS2_FAPI_RC_AUTHORIZATION_UNKNOWN]:
    'FAPI: Authorization callback not set',
  [enums.FAPI.TSS2_FAPI_RC_NV_NOT_READABLE]: 'FAPI: NV index is not readable',
  [enums.FAPI.TSS2_FAPI_RC_NV_TOO_SMALL]: 'FAPI: NV index is too small',
  [enums.FAPI.TSS2_FAPI_RC_NV_NOT_WRITEABLE]: 'FAPI: NV index is not writeable',
  [enums.FAPI.TSS2_FAPI_RC_POLICY_UNKNOWN]: 'FAPI: Policy not found',
  [enums.FAPI.TSS2_FAPI_RC_NV_WRONG_TYPE]: 'FAPI: NV index has wrong type',
  [enums.FAPI.TSS2_FAPI_RC_NAME_ALREADY_EXISTS]: 'FAPI: Name already exists',
  [enums.FAPI.TSS2_FAPI_RC_NO_TPM]: 'FAPI: No TPM available',
  [enums.FAPI.TSS2_FAPI_RC_TRY_AGAIN]: 'FAPI: Try again',
  [enums.FAPI.TSS2_FAPI_RC_BAD_KEY]: 'FAPI: Bad key',
  [enums.FAPI.TSS2_FAPI_RC_NO_HANDLE]: 'FAPI: No handle',
  [enums.FAPI.TSS2_FAPI_RC_NOT_PROVISIONED]: 'FAPI: TPM is not provisioned',
  [enums.FAPI.TSS2_FAPI_RC_ALREADY_PROVISIONED]:
    'FAPI: TPM is already provisioned',
  [enums.FAPI.TSS2_FAPI_RC_NULL_CALLBACK]: 'FAPI: Callback is NULL',
};

export class TPM2_TSS_ERROR extends Error {
  constructor(code: number, message: string) {
    super(message);
    this.name = 'TPM2_TSS_ERROR';
  }
}

export function checkResult(res: number) {
  if (res !== enums.TSS2_RC_SUCCESS) {
    throw new TPM2_TSS_ERROR(res, locale[res] || 'UNKNOWN_ERROR');
  }
}
