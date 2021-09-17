importScripts("wjpegxl.js")

onmessage = function(e) {
    console.log(e.data.buffer);
    JXL().then(function(jxlModule){
        jxlModule.test();

        let bufferSize = e.data.buffer.length
        let buffer = jxlModule._malloc(bufferSize);
          
        // data for process should be filled
        let bufferArray = new Uint8ClampedArray(jxlModule.HEAPU8.buffer, buffer, bufferSize);
  
        for (let i = 0; i < bufferSize; i++) {
            bufferArray[i] = e.data.buffer[i];
        }

        let options = jxlModule.createOptions();
        options.effort = 1;

        let result = jxlModule.jxlCompress(buffer, bufferSize, options);

        postMessage({buffer: result});
    })
}