import enums from './enums';

export const locale: Record<number, string> = {
  [enums.ERROR.TCTI.TSS2_TCTI_RC_GENERAL_FAILURE]: 'TCTI: General failure',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_NOT_IMPLEMENTED]: 'TCTI: Not implemented',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_BAD_CONTEXT]: 'TCTI: Bad context',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_ABI_MISMATCH]: 'TCTI: ABI mismatch',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_BAD_REFERENCE]:
    'TCTI: Bad reference (NULL pointer)',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_INSUFFICIENT_BUFFER]:
    'TCTI: Insufficient buffer',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_BAD_SEQUENCE]: 'TCTI: Bad call sequence',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_NO_CONNECTION]: 'TCTI: No connection',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_TRY_AGAIN]: 'TCTI: Try again',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_IO_ERROR]: 'TCTI: I/O error',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_BAD_VALUE]: 'TCTI: Bad value',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_NOT_PERMITTED]: 'TCTI: Not permitted',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_MALFORMED_RESPONSE]:
    'TCTI: Malformed response',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_NOT_SUPPORTED]: 'TCTI: Not supported',
  [enums.ERROR.TCTI.TSS2_TCTI_RC_MEMORY]: 'TCTI: Memory allocation failed',

  [enums.ERROR.SYS.TSS2_SYS_RC_GENERAL_FAILURE]: 'SYS: General failure',
  [enums.ERROR.SYS.TSS2_SYS_RC_ABI_MISMATCH]: 'SYS: ABI mismatch',
  [enums.ERROR.SYS.TSS2_SYS_RC_BAD_REFERENCE]:
    'SYS: Bad reference (NULL pointer)',
  [enums.ERROR.SYS.TSS2_SYS_RC_INSUFFICIENT_BUFFER]: 'SYS: Insufficient buffer',
  [enums.ERROR.SYS.TSS2_SYS_RC_BAD_SEQUENCE]: 'SYS: Bad call sequence',
  [enums.ERROR.SYS.TSS2_SYS_RC_BAD_VALUE]: 'SYS: Bad value',
  [enums.ERROR.SYS.TSS2_SYS_RC_INVALID_SESSIONS]: 'SYS: Invalid sessions',
  [enums.ERROR.SYS.TSS2_SYS_RC_NO_DECRYPT_PARAM]: 'SYS: No decrypt parameter',
  [enums.ERROR.SYS.TSS2_SYS_RC_NO_ENCRYPT_PARAM]: 'SYS: No encrypt parameter',
  [enums.ERROR.SYS.TSS2_SYS_RC_BAD_SIZE]: 'SYS: Bad size',
  [enums.ERROR.SYS.TSS2_SYS_RC_MALFORMED_RESPONSE]: 'SYS: Malformed response',
  [enums.ERROR.SYS.TSS2_SYS_RC_INSUFFICIENT_CONTEXT]:
    'SYS: Insufficient context',
  [enums.ERROR.SYS.TSS2_SYS_RC_INSUFFICIENT_RESPONSE]:
    'SYS: Insufficient response',
  [enums.ERROR.SYS.TSS2_SYS_RC_INCOMPATIBLE_TCTI]: 'SYS: Incompatible TCTI',
  [enums.ERROR.SYS.TSS2_SYS_RC_BAD_TCTI_STRUCTURE]: 'SYS: Bad TCTI structure',

  [enums.ERROR.MU.TSS2_MU_RC_GENERAL_FAILURE]: 'MU: General failure',
  [enums.ERROR.MU.TSS2_MU_RC_BAD_REFERENCE]: 'MU: Bad reference (NULL pointer)',
  [enums.ERROR.MU.TSS2_MU_RC_BAD_SIZE]: 'MU: Bad size',
  [enums.ERROR.MU.TSS2_MU_RC_BAD_VALUE]: 'MU: Bad value',
  [enums.ERROR.MU.TSS2_MU_RC_INSUFFICIENT_BUFFER]: 'MU: Insufficient buffer',

  [enums.ERROR.ESYS.TSS2_ESYS_RC_GENERAL_FAILURE]: 'ESYS: General failure',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_NOT_IMPLEMENTED]: 'ESYS: Not implemented',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_ABI_MISMATCH]: 'ESYS: ABI mismatch',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_BAD_REFERENCE]:
    'ESYS: Bad reference (NULL pointer)',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_INSUFFICIENT_BUFFER]:
    'ESYS: Insufficient buffer',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_BAD_SEQUENCE]: 'ESYS: Bad call sequence',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_INVALID_SESSIONS]: 'ESYS: Invalid sessions',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_TRY_AGAIN]: 'ESYS: Try again',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_IO_ERROR]: 'ESYS: I/O error',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_BAD_VALUE]: 'ESYS: Bad value',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_NO_DECRYPT_PARAM]:
    'ESYS: No decrypt parameter',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_NO_ENCRYPT_PARAM]:
    'ESYS: No encrypt parameter',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_BAD_SIZE]: 'ESYS: Bad size',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_MALFORMED_RESPONSE]:
    'ESYS: Malformed response',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_INSUFFICIENT_CONTEXT]:
    'ESYS: Insufficient context',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_INSUFFICIENT_RESPONSE]:
    'ESYS: Insufficient response',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_INCOMPATIBLE_TCTI]: 'ESYS: Incompatible TCTI',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_BAD_TCTI_STRUCTURE]:
    'ESYS: Bad TCTI structure',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_MEMORY]: 'ESYS: Memory allocation failed',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_BAD_TR]: 'ESYS: Bad TR handle',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_MULTIPLE_DECRYPT_SESSIONS]:
    'ESYS: Multiple decrypt sessions',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_MULTIPLE_ENCRYPT_SESSIONS]:
    'ESYS: Multiple encrypt sessions',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_NOT_SUPPORTED]: 'ESYS: Not supported',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_RSP_AUTH_FAILED]:
    'ESYS: Response authorization failed',
  [enums.ERROR.ESYS.TSS2_ESYS_RC_CALLBACK_NULL]: 'ESYS: Callback is NULL',

  [enums.ERROR.FAPI.TSS2_FAPI_RC_GENERAL_FAILURE]: 'FAPI: General failure',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NOT_IMPLEMENTED]: 'FAPI: Not implemented',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_BAD_REFERENCE]:
    'FAPI: Bad reference (NULL pointer)',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_BAD_SEQUENCE]:
    'FAPI: Bad call sequence (async operation still pending?)',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_IO_ERROR]: 'FAPI: I/O error',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_BAD_VALUE]: 'FAPI: Bad value',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NO_DECRYPT_PARAM]:
    'FAPI: No decrypt parameter',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NO_ENCRYPT_PARAM]:
    'FAPI: No encrypt parameter',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_MEMORY]: 'FAPI: Memory allocation failed',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_BAD_CONTEXT]: 'FAPI: Bad context',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NO_CONFIG]: 'FAPI: Config file not found',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_BAD_PATH]: 'FAPI: Bad path',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NOT_DELETABLE]:
    'FAPI: Object is not deletable',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_PATH_ALREADY_EXISTS]:
    'FAPI: Path already exists',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_KEY_NOT_FOUND]: 'FAPI: Key not found',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_SIGNATURE_VERIFICATION_FAILED]:
    'FAPI: Signature verification failed',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_HASH_MISMATCH]: 'FAPI: Hash mismatch',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_KEY_NOT_DUPLICABLE]:
    'FAPI: Key is not duplicable',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_PATH_NOT_FOUND]: 'FAPI: Path not found',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NO_CERT]: 'FAPI: Certificate not found',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NO_PCR]: 'FAPI: PCR not found',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_PCR_NOT_RESETTABLE]:
    'FAPI: PCR is not resettable',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_BAD_TEMPLATE]: 'FAPI: Bad template',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_AUTHORIZATION_FAILED]:
    'FAPI: Authorization failed',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_AUTHORIZATION_UNKNOWN]:
    'FAPI: Authorization callback not set',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NV_NOT_READABLE]:
    'FAPI: NV index is not readable',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NV_TOO_SMALL]: 'FAPI: NV index is too small',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NV_NOT_WRITEABLE]:
    'FAPI: NV index is not writeable',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_POLICY_UNKNOWN]: 'FAPI: Policy not found',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NV_WRONG_TYPE]:
    'FAPI: NV index has wrong type',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NAME_ALREADY_EXISTS]:
    'FAPI: Name already exists',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NO_TPM]: 'FAPI: No TPM available',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_TRY_AGAIN]: 'FAPI: Try again',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_BAD_KEY]: 'FAPI: Bad key',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NO_HANDLE]: 'FAPI: No handle',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NOT_PROVISIONED]:
    'FAPI: TPM is not provisioned',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_ALREADY_PROVISIONED]:
    'FAPI: TPM is already provisioned',
  [enums.ERROR.FAPI.TSS2_FAPI_RC_NULL_CALLBACK]: 'FAPI: Callback is NULL',
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
