importScripts("wjpegxl.js");

onmessage = function (e) {
  JXL().then(function (jxlModule) {
    let bufferSize = e.data.buffer.length;
    let buffer = jxlModule._malloc(bufferSize);

    let bufferArray = new Uint8ClampedArray(
      jxlModule.HEAPU8.buffer,
      buffer,
      bufferSize
    );

    for (let i = 0; i < bufferSize; i++) {
      bufferArray[i] = e.data.buffer[i];
    }

    const getQualityMode = (qualityMode) => {
      if (qualityMode === "quality") return jxlModule.QualityMode.Quality;
      if (qualityMode === "distance") return jxlModule.QualityMode.Distance;
    };

    const getColorTransform = (colortransform) => {
      if (colortransform === 0) return jxlModule.ColorTransform.XYB;
      if (colortransform === 1) return jxlModule.ColorTransform.None;
      if (colortransform === 2) return jxlModule.ColorTransform.YCbCr;
    };

    let options = jxlModule.createOptions();
    options = {
      ...e.data.options,
      colortransform: getColorTransform(e.data.options.colortransform),
      quality_mode: getQualityMode(e.data.options.quality_mode),
    };

    let result = jxlModule.jxlCompress(buffer, bufferSize, options);

    jxlModule._free(buffer);

    postMessage({ buffer: result });
  });
};
