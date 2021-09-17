import React, { useEffect } from 'react';

import wjpegxl from './wjpegxl';
import wjpegxlWASM from './wjpegxl.wasm';

export default function JXLConverter(props) {

    let jxlModule = null;

    const convertToJXL = (byteArray) => {
        debugger;
        let buffer_size = byteArray.length
        let buffer = jxlModule._malloc(buffer_size);
          
        // data for process should be filled
        let buffer_array = new Uint8ClampedArray(jxlModule.HEAPU8.buffer, buffer, buffer_size);
  
        for (let i = 0; i < buffer_size; i++) {
            buffer_array[i] = byteArray[i];
        }
                  
        let options = jxlModule.createOptions();

        options.progressive = props.options.progressive;
        options.override_bitdepth = +props.options.bitdepth;
        options.colorspace = +props.options.colorspace;
        options.resampling = +props.options.resampling;
        options.epf = +props.options.epf;
        options.quality = +props.options.quality;
        options.effort = +props.options.effort;

        let colortrnf = +props.options.colortransform;
        if (colortrnf === 0) {
            options.colortransform = jxlModule.ColorTransform.XYB;
        }
        if (colortrnf === 1) {
            options.colortransform = jxlModule.ColorTransform.None;
        }
        if (colortrnf === 2) {
            options.colortransform = jxlModule.ColorTransform.YCbCr;
        }

        console.log(options);
        let result = jxlModule.jxlCompress(buffer, buffer_size, options);
        return result;
    };

    useEffect(() => {
        console.log("!!!!!!!!!!!!" + wjpegxlWASM);
        const jxlPromise = wjpegxl({
            locateFile: () => {
                return wjpegxlWASM;
            },
        });
        
        jxlPromise.then((module) => {
            jxlModule = module;
            props.setFileConverter(convertToJXL.bind(this));
        });
      });

    return (null);
}