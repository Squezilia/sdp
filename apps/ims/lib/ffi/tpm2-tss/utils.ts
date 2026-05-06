export function allocOutPtr(): Uint8Array {
  return new Uint8Array(8);
}

/**
 * Bir Uint8Array'in ilk 8 baytını little-endian pointer olarak okur.
 */
export function readPtr(buf: Uint8Array): number {
  // DataView ile platform bağımsız okuma
  const view = new DataView(buf.buffer, buf.byteOffset);
  // BigInt -> number (JS sayıları 53-bit'e kadar güvenli)
  const lo = view.getUint32(0, true);
  const hi = view.getUint32(4, true);
  return lo + hi * 0x100000000;
}

export function readSizeT(buf: Uint8Array): number {
  return readPtr(buf);
}

export function writePointer(pointer: number): Uint8Array<ArrayBufferLike> {
  const ctxBuf = allocOutPtr();
  const view = new DataView(ctxBuf.buffer);

  // little-endian
  const lo = pointer >>> 0;
  const hi = Math.floor(pointer / 0x100000000);
  view.setUint32(0, lo, true);
  view.setUint32(4, hi, true);
  return ctxBuf;
}
