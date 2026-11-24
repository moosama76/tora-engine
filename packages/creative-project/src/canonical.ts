/** tora-cjson-1 authoring codec. Ingress validation is performed separately. */
function quote(text: string): string {
  let result = '"';
  for (const c of text) {
    const code = c.codePointAt(0)!;
    if (code >= 0xd800 && code <= 0xdfff) throw Error('INVALID_UNICODE');
    if (c === '"' || c === '\\') result += `\\${c}`;
    else if (code < 32) result += `\\u${code.toString(16).padStart(4, '0')}`;
    else result += c;
  }
  return result + '"';
}
function compareScalar(a: string, b: string): number {
  const x = Array.from(a, c => c.codePointAt(0)!), y = Array.from(b, c => c.codePointAt(0)!);
  for (let i = 0; i < Math.min(x.length, y.length); i++) if (x[i] !== y[i]) return x[i]! - y[i]!;
  return x.length - y.length;
}
export function canonical(value: unknown): string {
  if (typeof value === 'boolean') return `["b",${value}]`;
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER) throw Error('INVALID_NUMBER');
    const view = new DataView(new ArrayBuffer(8)); view.setFloat64(0, value === 0 ? 0 : value, false);
    const bits = Array.from({ length: 8 }, (_, i) => view.getUint8(i).toString(16).padStart(2, '0')).join('');
    return `["n","${bits}"]`;
  }
  if (typeof value === 'string') return `["s",${quote(value)}]`;
  if (Array.isArray(value)) return `["a",[${value.map(canonical).join(',')}]]`;
  if (value !== null && typeof value === 'object') return `["o",[${Object.keys(value).sort(compareScalar).map(key => `[${quote(key)},${canonical((value as Record<string, unknown>)[key])}]`).join(',')}]]`;
  throw Error('INVALID_VALUE');
}
export function projectContent(value: unknown): unknown {
  if (value === null || Array.isArray(value) || typeof value !== 'object') throw Error('INVALID_DOCUMENT');
  const { revisionId: ignored, ...content } = value as Record<string, unknown>;
  void ignored; return content;
}
