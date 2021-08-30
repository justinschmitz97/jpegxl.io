import React, { useEffect } from 'react';

import wjpegxl from './wjpegxl';
import wjpegxlWASM from './wjpegxl.wasm';

export default function JXLConverter(props) {

    let jxlModule = null;

    const convertToJXL = (byteArray) => {
        let buffer_size = byteArray.length
        let buffer = jxlModule._malloc(buffer_size);
          
        // data for process should be filled
        let buffer_array = new Uint8ClampedArray(jxlModule.HEAPU8.buffer, buffer, buffer_size);
  
        for (let i = 0; i < buffer_size; i++) {
            buffer_array[i] = byteArray[i];
        }
                  
        let options = jxlModule.createOptions();
        
        debugger;
        let result = jxlModule.jxlCompress(buffer, buffer_size, options);
        console.log(result);
        return result;
    };

    useEffect(() => {
        const jxlPromise = wjpegxl({
            locateFile: () => {
                return wjpegxlWASM;
            },
        });
        
        jxlPromise.then((module) => {
            jxlModule = module;
            jxlModule.test();
            props.setFileConverter(convertToJXL.bind(this));
        });
      });

    return (null);
}