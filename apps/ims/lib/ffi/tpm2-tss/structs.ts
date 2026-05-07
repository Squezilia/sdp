/**
 * TPM2-TSS ESAPI structure packers for the subset used by IMS.
 *
 * These are native in-memory layouts from the installed tpm2-tss headers, not
 * TPM wire marshaling. The byte-array fields below are inline C arrays.
 */

type ByteLike = Iterable<number> | ArrayLike<number> | ArrayBufferView;

interface StructDef<Input, Output = Input> {
  size: number;
  pack(value: Input): ArrayBuffer;
  unpack(buffer: ArrayBuffer | SharedArrayBuffer): Output;
}

type TPM2BInput<Field extends string> = {
  size?: number;
} & Record<Field, ByteLike>;

type TPM2BOutput<Field extends string> = {
  size: number;
} & Record<Field, number[]>;

const TPMU_HA_SIZE = 64;
const TPM2_PCR_SELECT_MAX = 4;
const TPM2_NUM_PCR_BANKS = 16;
const TPMU_SENSITIVE_CREATE_SIZE = 256;

const TPMS_SENSITIVE_CREATE_SIZE = 324;
const TPM2B_SENSITIVE_CREATE_SIZE = 326;
const TPMS_PCR_SELECTION_SIZE = 8;
const TPML_PCR_SELECTION_SIZE = 132;
const TPMT_TK_CREATION_SIZE = 76;

const PRIVATE_BUFFER_SIZE = 1550;
const PUBLIC_AREA_SIZE = 612;
const CREATION_DATA_SIZE = 408;

export const TPM2_ALG_ID = {
  enum: {
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
};

type TPM2AlgName = keyof typeof TPM2_ALG_ID.enum;
type TPM2AlgValue = TPM2AlgName | number;

function toBytes(value: ByteLike | undefined): number[] {
  if (!value) return [];

  if (ArrayBuffer.isView(value)) {
    return Array.from(
      new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
    );
  }

  return Array.from(value);
}

function assertBufferSize(
  buffer: ArrayBuffer | SharedArrayBuffer,
  size: number,
  name: string
) {
  if (buffer.byteLength < size) {
    throw new Error(
      `${name} buffer is ${buffer.byteLength} bytes, expected at least ${size}`
    );
  }
}

function writeBytes(
  view: DataView,
  offset: number,
  bytes: number[],
  maxLength: number,
  fieldName: string
) {
  if (bytes.length > maxLength) {
    throw new RangeError(
      `${fieldName} is ${bytes.length} bytes, maximum is ${maxLength}`
    );
  }

  const out = new Uint8Array(view.buffer, offset, maxLength);
  out.set(bytes);
}

function readBytes(
  view: DataView,
  offset: number,
  length: number,
  maxLength: number,
  fieldName: string
): number[] {
  if (length > maxLength) {
    throw new RangeError(
      `${fieldName} size is ${length} bytes, maximum is ${maxLength}`
    );
  }

  return Array.from(new Uint8Array(view.buffer, offset, length));
}

function enumToNumber(value: TPM2AlgValue): number {
  if (typeof value === 'number') return value;
  const enumValue = TPM2_ALG_ID.enum[value];

  if (enumValue === undefined) {
    throw new TypeError(`Unknown TPM2_ALG_ID value: ${value}`);
  }

  return enumValue;
}

function enumFromNumber(value: number): TPM2AlgName | number {
  const entry = Object.entries(TPM2_ALG_ID.enum).find(
    ([, enumValue]) => enumValue === value
  );

  if (!entry) return value;

  const [name] = entry;
  return name as TPM2AlgName;
}

function defineTPM2B<Field extends string>(
  name: string,
  fieldName: Field,
  totalSize: number,
  dataOffset: number,
  maxDataLength: number
): StructDef<TPM2BInput<Field>, TPM2BOutput<Field>> {
  return {
    size: totalSize,
    pack(value) {
      const bytes = toBytes(value[fieldName]);
      const size = value.size ?? bytes.length;

      if (size > maxDataLength) {
        throw new RangeError(
          `${name}.size is ${size}, maximum is ${maxDataLength}`
        );
      }
      if (bytes.length > size) {
        throw new RangeError(
          `${name}.${fieldName} has ${bytes.length} bytes, but size is ${size}`
        );
      }

      const buffer = new ArrayBuffer(totalSize);
      const view = new DataView(buffer);
      view.setUint16(0, size, true);
      writeBytes(
        view,
        dataOffset,
        bytes,
        maxDataLength,
        `${name}.${fieldName}`
      );
      return buffer;
    },
    unpack(buffer) {
      assertBufferSize(buffer, totalSize, name);

      const view = new DataView(buffer);
      const size = view.getUint16(0, true);
      const bytes = readBytes(
        view,
        dataOffset,
        size,
        maxDataLength,
        `${name}.${fieldName}`
      );

      return {
        size,
        [fieldName]: bytes,
      } as TPM2BOutput<Field>;
    },
  };
}

export const TPM2B_DIGEST = defineTPM2B(
  'TPM2B_DIGEST',
  'buffer',
  66,
  2,
  TPMU_HA_SIZE
);

export const TPM2B_DATA = defineTPM2B(
  'TPM2B_DATA',
  'buffer',
  66,
  2,
  TPMU_HA_SIZE
);

export const TPM2B_SENSITIVE_DATA = defineTPM2B(
  'TPM2B_SENSITIVE_DATA',
  'buffer',
  258,
  2,
  TPMU_SENSITIVE_CREATE_SIZE
);

export const TPM2B_AUTH = defineTPM2B(
  'TPM2B_AUTH',
  'buffer',
  66,
  2,
  TPMU_HA_SIZE
);

export const TPMS_SENSITIVE_CREATE: StructDef<{
  userAuth: TTPM2B_AUTH;
  data: TTPM2B_SENSITIVE_DATA;
}> = {
  size: TPMS_SENSITIVE_CREATE_SIZE,
  pack(value) {
    const buffer = new ArrayBuffer(TPMS_SENSITIVE_CREATE_SIZE);
    const out = new Uint8Array(buffer);

    out.set(new Uint8Array(TPM2B_AUTH.pack(value.userAuth)), 0);
    out.set(new Uint8Array(TPM2B_SENSITIVE_DATA.pack(value.data)), 66);

    return buffer;
  },
  unpack(buffer) {
    assertBufferSize(
      buffer,
      TPMS_SENSITIVE_CREATE_SIZE,
      'TPMS_SENSITIVE_CREATE'
    );

    return {
      userAuth: TPM2B_AUTH.unpack(buffer.slice(0, 66)),
      data: TPM2B_SENSITIVE_DATA.unpack(buffer.slice(66, 324)),
    };
  },
};

export const TPM2B_SENSITIVE_CREATE: StructDef<{
  size?: number;
  sensitive: TTPMS_SENSITIVE_CREATE;
}> = {
  size: TPM2B_SENSITIVE_CREATE_SIZE,
  pack(value) {
    const sensitive = TPMS_SENSITIVE_CREATE.pack(value.sensitive);
    const size = value.size ?? TPMS_SENSITIVE_CREATE_SIZE;

    if (size > TPMS_SENSITIVE_CREATE_SIZE) {
      throw new RangeError(
        `TPM2B_SENSITIVE_CREATE.size is ${size}, maximum is ${TPMS_SENSITIVE_CREATE_SIZE}`
      );
    }

    const buffer = new ArrayBuffer(TPM2B_SENSITIVE_CREATE_SIZE);
    const view = new DataView(buffer);
    view.setUint16(0, size, true);
    new Uint8Array(buffer).set(new Uint8Array(sensitive).slice(0, size), 2);

    return buffer;
  },
  unpack(buffer) {
    assertBufferSize(
      buffer,
      TPM2B_SENSITIVE_CREATE_SIZE,
      'TPM2B_SENSITIVE_CREATE'
    );

    const view = new DataView(buffer);
    return {
      size: view.getUint16(0, true),
      sensitive: TPMS_SENSITIVE_CREATE.unpack(buffer.slice(2, 326)),
    };
  },
};

export const TPMS_PCR_SELECTION: StructDef<
  {
    hash: TPM2AlgValue;
    sizeofSelect?: number;
    pcrSelect: ByteLike;
  },
  {
    hash: TPM2AlgName | number;
    sizeofSelect: number;
    pcrSelect: number[];
  }
> = {
  size: TPMS_PCR_SELECTION_SIZE,
  pack(value) {
    const pcrSelect = toBytes(value.pcrSelect);
    const sizeofSelect = value.sizeofSelect ?? pcrSelect.length;

    if (sizeofSelect > TPM2_PCR_SELECT_MAX) {
      throw new RangeError(
        `TPMS_PCR_SELECTION.sizeofSelect is ${sizeofSelect}, maximum is ${TPM2_PCR_SELECT_MAX}`
      );
    }
    if (pcrSelect.length > sizeofSelect) {
      throw new RangeError(
        `TPMS_PCR_SELECTION.pcrSelect has ${pcrSelect.length} bytes, but sizeofSelect is ${sizeofSelect}`
      );
    }

    const buffer = new ArrayBuffer(TPMS_PCR_SELECTION_SIZE);
    const view = new DataView(buffer);
    view.setUint16(0, enumToNumber(value.hash), true);
    view.setUint8(2, sizeofSelect);
    writeBytes(
      view,
      3,
      pcrSelect,
      TPM2_PCR_SELECT_MAX,
      'TPMS_PCR_SELECTION.pcrSelect'
    );

    return buffer;
  },
  unpack(buffer) {
    assertBufferSize(buffer, TPMS_PCR_SELECTION_SIZE, 'TPMS_PCR_SELECTION');

    const view = new DataView(buffer);
    const sizeofSelect = view.getUint8(2);

    return {
      hash: enumFromNumber(view.getUint16(0, true)),
      sizeofSelect,
      pcrSelect: readBytes(
        view,
        3,
        sizeofSelect,
        TPM2_PCR_SELECT_MAX,
        'TPMS_PCR_SELECTION.pcrSelect'
      ),
    };
  },
};

export const TPML_PCR_SELECTION: StructDef<{
  count?: number;
  pcrSelections: TTPMS_PCR_SELECTION[];
}> = {
  size: TPML_PCR_SELECTION_SIZE,
  pack(value) {
    const selections = value.pcrSelections ?? [];
    const count = value.count ?? selections.length;

    if (count > TPM2_NUM_PCR_BANKS) {
      throw new RangeError(
        `TPML_PCR_SELECTION.count is ${count}, maximum is ${TPM2_NUM_PCR_BANKS}`
      );
    }
    if (selections.length > count) {
      throw new RangeError(
        `TPML_PCR_SELECTION has ${selections.length} entries, but count is ${count}`
      );
    }

    const buffer = new ArrayBuffer(TPML_PCR_SELECTION_SIZE);
    const view = new DataView(buffer);
    const out = new Uint8Array(buffer);
    view.setUint32(0, count, true);

    selections.forEach((selection, index) => {
      out.set(
        new Uint8Array(TPMS_PCR_SELECTION.pack(selection)),
        4 + index * TPMS_PCR_SELECTION_SIZE
      );
    });

    return buffer;
  },
  unpack(buffer) {
    assertBufferSize(buffer, TPML_PCR_SELECTION_SIZE, 'TPML_PCR_SELECTION');

    const view = new DataView(buffer);
    const count = view.getUint32(0, true);

    if (count > TPM2_NUM_PCR_BANKS) {
      throw new RangeError(
        `TPML_PCR_SELECTION.count is ${count}, maximum is ${TPM2_NUM_PCR_BANKS}`
      );
    }

    const pcrSelections = Array.from({ length: count }, (_, index) =>
      TPMS_PCR_SELECTION.unpack(
        buffer.slice(
          4 + index * TPMS_PCR_SELECTION_SIZE,
          4 + (index + 1) * TPMS_PCR_SELECTION_SIZE
        )
      )
    );

    return { count, pcrSelections };
  },
};

export const TPMT_TK_CREATION: StructDef<{
  tag: number;
  hierarchy: number;
  digest: TTPM2B_DIGEST;
}> = {
  size: TPMT_TK_CREATION_SIZE,
  pack(value) {
    const buffer = new ArrayBuffer(TPMT_TK_CREATION_SIZE);
    const view = new DataView(buffer);
    const out = new Uint8Array(buffer);

    view.setUint16(0, value.tag, true);
    view.setUint32(4, value.hierarchy, true);
    out.set(new Uint8Array(TPM2B_DIGEST.pack(value.digest)), 8);

    return buffer;
  },
  unpack(buffer) {
    assertBufferSize(buffer, TPMT_TK_CREATION_SIZE, 'TPMT_TK_CREATION');

    const view = new DataView(buffer);
    return {
      tag: view.getUint16(0, true),
      hierarchy: view.getUint32(4, true),
      digest: TPM2B_DIGEST.unpack(buffer.slice(8, 74)),
    };
  },
};

export const TPM2B_PRIVATE = defineTPM2B(
  'TPM2B_PRIVATE',
  'buffer',
  1552,
  2,
  PRIVATE_BUFFER_SIZE
);

export const TPM2B_PUBLIC = defineTPM2B(
  'TPM2B_PUBLIC',
  'publicArea',
  616,
  4,
  PUBLIC_AREA_SIZE
);

export const TPM2B_CREATION_DATA = defineTPM2B(
  'TPM2B_CREATION_DATA',
  'creationData',
  412,
  4,
  CREATION_DATA_SIZE
);

export type TTPM2B_DIGEST = Parameters<typeof TPM2B_DIGEST.pack>[0];
export type TTPM2B_DATA = Parameters<typeof TPM2B_DATA.pack>[0];
export type TTPM2B_SENSITIVE_DATA = Parameters<
  typeof TPM2B_SENSITIVE_DATA.pack
>[0];
export type TTPM2B_AUTH = Parameters<typeof TPM2B_AUTH.pack>[0];
export type TTPMS_SENSITIVE_CREATE = Parameters<
  typeof TPMS_SENSITIVE_CREATE.pack
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
