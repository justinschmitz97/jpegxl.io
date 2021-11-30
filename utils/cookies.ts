export function setCookieJson(key: string, value: any) {
  document.cookie = `${key}=${JSON.stringify(value)}`;
}

export function getCookieJson(key: string): any {
  const str = document.cookie
    .split("; ")
    .map((s) => s.split("="))
    .find(([k]) => k === key)?.[1];
  if (str === undefined) {
    return undefined;
  }
  return JSON.parse(str);
}
