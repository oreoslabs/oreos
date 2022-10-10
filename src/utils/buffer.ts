function toHuman(buffer: Buffer): string {
  return buffer
    .toString('utf8')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .trim();
}

export const BufferUtils = { toHuman };
