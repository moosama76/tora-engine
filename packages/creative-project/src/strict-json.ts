/** V2-only strict ingress. Existing v1 parser is deliberately unchanged. */
export function parseAuthoringJson(text: string, limits: {bytes:number,nodes:number,depth:number,allowNull?:boolean} = {bytes:1_048_576,nodes:10_000,depth:64}): unknown {
  if (new TextEncoder().encode(text).length > limits.bytes) throw Error('E_V2_LIMIT');
  let i = 0, nodes = 0;
  const space = () => { while (/[\t\r\n ]/.test(text[i] ?? 'x')) i++; };
  const scalar = (s: string) => { for (const c of s) if (c.codePointAt(0)! >= 0xd800 && c.codePointAt(0)! <= 0xdfff) throw Error('E_V2_UNICODE'); };
  scalar(text);
  function string(): string {
    const start = i++;
    while (i < text.length) {
      if (text[i] === '\\') { i += 2; continue; }
      if (text[i++] === '"') { const result = JSON.parse(text.slice(start, i)) as string; scalar(result); return result; }
    }
    throw Error('E_V2_JSON');
  }
  function value(depth: number): void {
    if (++nodes > limits.nodes || depth > limits.depth) throw Error('E_V2_LIMIT');
    space(); const ch = text[i];
    if (ch === '"') { string(); return; }
    if (ch === '{' || ch === '[') {
      i++; space(); const end = ch === '{' ? '}' : ']', keys = new Set<string>();
      if (text[i] === end) { i++; return; }
      while (i < text.length) {
        if (ch === '{') { space(); if (text[i] !== '"') throw Error('E_V2_JSON'); const key = string(); if (keys.has(key)) throw Error('E_V2_DUPLICATE_KEY'); keys.add(key); space(); if (text[i++] !== ':') throw Error('E_V2_JSON'); }
        value(depth + 1); space(); if (text[i] === end) { i++; return; } if (text[i++] !== ',') throw Error('E_V2_JSON');
      }
      throw Error('E_V2_JSON');
    }
    const start = i; while (i < text.length && !/[\t\r\n ,\]}]/.test(text[i]!)) i++;
    if (start === i) throw Error('E_V2_JSON');
    const v: unknown = JSON.parse(text.slice(start, i));
    if ((v === null && !limits.allowNull) || typeof v === 'number' && (!Number.isFinite(v) || Math.abs(v) > Number.MAX_SAFE_INTEGER)) throw Error('E_V2_VALUE');
  }
  value(0); space(); if (i !== text.length) throw Error('E_V2_JSON'); return JSON.parse(text) as unknown;
}
/** Binary callers must use fatal decoding; replacement of malformed UTF-8 is forbidden. */
export function parseAuthoringBytes(bytes: Uint8Array): unknown {
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) throw Error('E_V2_JSON');
  return parseAuthoringJson(new TextDecoder('utf-8', {fatal:true}).decode(bytes));
}
