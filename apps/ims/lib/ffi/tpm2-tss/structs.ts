/**
 * Source: tss2_tpm2_types.h (Intel TSS2 v1.2.1.108)
 *
 * Types:
 *   - TPM2B_DIGEST
 *   - TPM2B_DATA
 *   - TPM2B_SENSITIVE_DATA
 *   - TPM2B_SENSITIVE_CREATE
 *   - TPML_PCR_SELECTION
 *   - TPMT_TK_CREATION
 *   - TPM2B_PRIVATE
 *   - TPM2B_PUBLIC
 *   - TPM2B_CREATION_DATA
 */

import { defineStruct, defineEnum } from 'bun-ffi-structs';

//
// Struct Sizes
//

/** sizeof(TPMU_HA) = max digest boyutu = SHA-512 = 64 byte */
const TPMU_HA_SIZE = 64;

/** TPM2_PCR_SELECT_MAX = ceil(32 / 8) = 4 byte */
const TPM2_PCR_SELECT_MAX = 4;

/** TPM2_NUM_PCR_BANKS = 16 */
const TPM2_NUM_PCR_BANKS = 16;

/** sizeof(TPMU_SENSITIVE_CREATE) = max(create[256], TPMS_DERIVE[68]) = 256 byte */
const TPMU_SENSITIVE_CREATE_SIZE = 256;

/**
 * sizeof(_PRIVATE):
 *   integrityOuter (TPM2B_DIGEST = 2+64=66)
 *   + integrityInner (TPM2B_DIGEST = 66)
 *   + sensitive (TPM2B_SENSITIVE = 2 + TPMT_SENSITIVE)
 *
 * sizeof(TPMT_SENSITIVE):
 *   sensitiveType (u16=2)
 *   + authValue (TPM2B_DIGEST=66)
 *   + seedValue (TPM2B_DIGEST=66)
 *   + sensitive (TPMU_SENSITIVE_COMPOSITE = max(TPM2B_PRIVATE_KEY_RSA=1282,...) = 1282)
 *   = 2 + 66 + 66 + 1282 = 1416
 *
 * TPM2B_SENSITIVE = 2 + 1416 = 1418
 * _PRIVATE = 66 + 66 + 1418 = 1550
 */
const _PRIVATE_SIZE = 1550;

/**
 * sizeof(TPMT_PUBLIC):
 *   type (u16=2) + nameAlg (u16=2) + objectAttributes (u32=4)
 *   + authPolicy (TPM2B_DIGEST=66)
 *   + parameters (TPMU_PUBLIC_PARMS = max(TPMS_RSA_PARMS=18,...) = 18)
 *   + unique (TPMU_PUBLIC_ID = max(TPM2B_PUBLIC_KEY_RSA=514,...) = 514)
 *   = 2 + 2 + 4 + 66 + 18 + 514 = 606
 */
const TPMT_PUBLIC_SIZE = 606;

/**
 * sizeof(TPMS_CREATION_DATA):
 *   pcrSelect (TPML_PCR_SELECTION = 4+16*7=116)
 *   + pcrDigest (TPM2B_DIGEST=66)
 *   + locality (u8=1)
 *   + parentNameAlg (u16=2)
 *   + parentName (TPM2B_NAME = 2+66=68)
 *   + parentQualifiedName (68)
 *   + outsideInfo (TPM2B_DATA=66)
 *   = 116 + 66 + 1 + 2 + 68 + 68 + 66 = 387
 */
const TPMS_CREATION_DATA_SIZE = 387;

//
// TPM2_ALG_ID enum (yaygın kullanılan algoritmalar)
//

export const TPM2_ALG_ID = defineEnum(
  {
    TPM2_ALG_ERROR: 0x0000,
    TPM2_ALG_RSA: 0x0001,
    TPM2_ALG_SHA1: 0x0004,
    TPM2_ALG_HMAC: 0x0005,
    TPM2_ALG_AES: 0x0006,
    TPM2_ALG_SHA256: 0x000b,
    TPM2_ALG_SHA384: 0x000c,
    TPM2_ALG_SHA512: 0x000d,
    TPM2_ALG_NULL: 0x0010,
    TPM2_ALG_SM3_256: 0x0012,
    TPM2_ALG_ECC: 0x0023,
  },
  'u16'
);

//
// TPM2B_DIGEST
//   struct { UINT16 size; BYTE buffer[64]; }
//

export const TPM2B_DIGEST = defineStruct(
  [
    ['size', 'u16'],
    ['buffer', ['u8'], { lengthOf: 'size' }],
  ] as const,
  {
    default: { size: 0 },
  }
);

//
// TPM2B_DATA  (TPM2B_DIGEST ile aynı layout)
//   struct { UINT16 size; BYTE buffer[64]; }
//

export const TPM2B_DATA = defineStruct(
  [
    ['size', 'u16'],
    ['buffer', ['u8'], { lengthOf: 'size' }],
  ] as const,
  {
    default: { size: 0 },
  }
);

//
// TPM2B_SENSITIVE_DATA
//   struct { UINT16 size; BYTE buffer[256]; }
//   buffer = sizeof(TPMU_SENSITIVE_CREATE)
//

export const TPM2B_SENSITIVE_DATA = defineStruct(
  [
    ['size', 'u16'],
    ['buffer', ['u8'], { lengthOf: 'size' }],
  ] as const,
  {
    default: { size: 0 },
  }
);

//
// TPM2B_AUTH  (= TPM2B_DIGEST, aynı layout)
//

export const TPM2B_AUTH = defineStruct(
  [
    ['size', 'u16'],
    ['buffer', ['u8'], { lengthOf: 'size' }],
  ] as const,
  {
    default: { size: 0 },
  }
);

//
// TPMS_SENSITIVE_CREATE
//   struct {
//     TPM2B_AUTH           userAuth;
//     TPM2B_SENSITIVE_DATA data;
//   }
//

export const TPMS_SENSITIVE_CREATE = defineStruct([
  ['userAuth', TPM2B_AUTH],
  ['data', TPM2B_SENSITIVE_DATA],
] as const);

//
// TPM2B_SENSITIVE_CREATE
//   struct { UINT16 size; TPMS_SENSITIVE_CREATE sensitive; }
//

export const TPM2B_SENSITIVE_CREATE = defineStruct([
  ['size', 'u16'],
  ['sensitive', TPMS_SENSITIVE_CREATE],
] as const);

//
// TPMS_PCR_SELECTION
//   struct {
//     TPMI_ALG_HASH hash;         // u16
//     UINT8         sizeofSelect; // u8
//     BYTE          pcrSelect[4]; // u8[4]
//   }
//

export const TPMS_PCR_SELECTION = defineStruct([
  ['hash', TPM2_ALG_ID],
  ['sizeofSelect', 'u8'],
  ['pcrSelect', ['u8'], { lengthOf: 'sizeofSelect' }],
] as const);

//
// TPML_PCR_SELECTION
//   struct {
//     UINT32             count;
//     TPMS_PCR_SELECTION pcrSelections[16];
//   }
//

export const TPML_PCR_SELECTION = defineStruct([
  ['count', 'u32'],
  ['pcrSelections', [TPMS_PCR_SELECTION], { lengthOf: 'count' }],
] as const);

//
// TPMT_TK_CREATION
//   struct {
//     TPM2_ST           tag;        // u16
//     TPMI_RH_HIERARCHY hierarchy;  // u32 (TPM2_HANDLE)
//     TPM2B_DIGEST      digest;
//   }
//

export const TPMT_TK_CREATION = defineStruct([
  ['tag', 'u16'],
  ['hierarchy', 'u32'],
  ['digest', TPM2B_DIGEST],
] as const);

//
// TPM2B_PRIVATE
//   struct { UINT16 size; BYTE buffer[sizeof(_PRIVATE)]; }
//
//   İç yapı (_PRIVATE) çok sayıda iç içe union içerdiğinden
//   opak bir u8 dizisi olarak tutulur. Boyut: 1550 byte.
//

export const TPM2B_PRIVATE = defineStruct(
  [
    ['size', 'u16'],
    ['buffer', ['u8'], { lengthOf: 'size' }],
  ] as const,
  {
    default: { size: 0 },
  }
);

//
// TPM2B_PUBLIC
//   struct { UINT16 size; TPMT_PUBLIC publicArea; }
//
//   TPMT_PUBLIC birden fazla union (TPMU_PUBLIC_PARMS, TPMU_PUBLIC_ID) içerdiğinden
//   publicArea opak u8 dizisi olarak tutulur. Boyut: 606 byte.
//

export const TPM2B_PUBLIC = defineStruct(
  [
    ['size', 'u16'],
    ['publicArea', ['u8'], { lengthOf: 'size' }],
  ] as const,
  {
    default: { size: 0 },
  }
);

//
// TPM2B_CREATION_DATA
//   struct { UINT16 size; TPMS_CREATION_DATA creationData; }
//
//   TPMS_CREATION_DATA içinde TPML_PCR_SELECTION ve çeşitli TPM2B alanları
//   bulunduğundan creationData opak u8 dizisi olarak tutulur. Boyut: 387 byte.
//

export const TPM2B_CREATION_DATA = defineStruct(
  [
    ['size', 'u16'],
    ['creationData', ['u8'], { lengthOf: 'size' }],
  ] as const,
  {
    default: { size: 0 },
  }
);

//
// Type Exports
//

export type TTPM2B_DIGEST = Parameters<typeof TPM2B_DIGEST.pack>[0];
export type TTPM2B_DATA = Parameters<typeof TPM2B_DATA.pack>[0];
export type TTPM2B_SENSITIVE_DATA = Parameters<
  typeof TPM2B_SENSITIVE_DATA.pack
>[0];
export type TTPM2B_SENSITIVE_CREATE = Parameters<
  typeof TPM2B_SENSITIVE_CREATE.pack
>[0];
export type TTPMS_PCR_SELECTION = Parameters<typeof TPMS_PCR_SELECTION.pack>[0];
export type TTPML_PCR_SELECTION = Parameters<typeof TPML_PCR_SELECTION.pack>[0];
export type TTPMT_TK_CREATION = Parameters<typeof TPMT_TK_CREATION.pack>[0];
export type TTPM2B_PRIVATE = Parameters<typeof TPM2B_PRIVATE.pack>[0];
export type TTPM2B_PUBLIC = Parameters<typeof TPM2B_PUBLIC.pack>[0];
export type TTPM2B_CREATION_DATA = Parameters<
  typeof TPM2B_CREATION_DATA.pack
>[0];
