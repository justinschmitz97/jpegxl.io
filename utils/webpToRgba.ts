let webpWasm: any = undefined;

export default async function webpToRgba(data: Uint8Array): Promise<ImageData> {
  if (webpWasm === undefined) {
    const { default: Module } = await import("./webp_wasm");
    webpWasm = await Module();
  }

  const webpToCanvas = webpWasm.cwrap("WebpToSDL", "number", [
    "array",
    "number",
  ]);
  const canvas = document.createElement("canvas");
  canvas.hidden = true;
  document.body.append(canvas);
  webpWasm.canvas = canvas;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // TODO Should I delete the canvas after?
  webpToCanvas(data, data.length);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
