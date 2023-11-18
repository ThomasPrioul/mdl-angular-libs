export function parseFunction(
  source: string | undefined | null,
  params: string[] = ['def']
): Function | null {
  let res = null;
  if (source?.length) {
    try {
      res = new Function(...params, source);
    } catch (err) {
      res = null;
    }
  }
  return res;
}
