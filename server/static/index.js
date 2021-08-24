document.addEventListener('DOMContentLoaded', function () {
    JXL().then(function(JXL){
        JXL = JXL;
        
        let url = "image/tmshre_riaphotographs_alpha.png"

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";

        xhr.onload = function (e) {
            console.log("loaded");
            var arrayBuffer = xhr.response; 
            if (arrayBuffer) {
                var byteArray = new Uint8Array(arrayBuffer);

                let buffer_size = byteArray.length
                let buffer = JXL._malloc(buffer_size);
          
                // data for process should be filled
                let buffer_array = new Uint8ClampedArray(JXL.HEAPU8.buffer, buffer, buffer_size);
  
                for (let i = 0; i < buffer_size; i++) {
                    buffer_array[i] = byteArray[i];
                }
                  
                let result = JXL.jxlCompress(buffer, buffer_size);
                console.log(result);
                
                var saveByteArray = (function () {
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    return function (data, name) {
                        var blob = new Blob(data, {type: "octet/stream"}),
                            url = window.URL.createObjectURL(blob);
                        a.href = url;
                        a.download = name;
                        a.click();
                        window.URL.revokeObjectURL(url);
                    };
                    }());

                saveByteArray([result], 'test-png-alpha.jxl');

            }

        };

        xhr.send();

        // try {
        //     xhr.send();
        //     if (xhr.status !== 200) {
        //         console.log(xhr.response);
        //         console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        //     } else {
        //         console.log("Okey");

        //         var arrayBuffer = xhr.response; // Note: not oReq.responseText
        //         if (arrayBuffer) {
        //             var byteArray = new Uint8Array(arrayBuffer);
        //             let st = byteArray.join('');
        //             console.log(st);
        //         }

        //         // let buffer_size = xhr.response.length;
        //         // let buffer = JXL._malloc(buffer_size);
        
        //         // // data for process should be filled
        //         // let buffer_array = new Uint8ClampedArray(JXL.HEAPU8.buffer, buffer, buffer_size);

        //         // for (let i = 0; i < buffer_size; i++) {
        //         //     buffer_array[i] = xhr.response[i].charCodeAt(0);
        //         // }

        //         // console.log(buffer_array);
                
        //         // let result = JXL.jxlCompress(buffer, buffer_size);

        //         // let buffer_r_array = new Uint8ClampedArray(JXL.HEAPU8.buffer, result.data, result.size);
        //         // console.log("Status: ", result.status);
                
        //     }
        // } catch(err) {
        //     console.log("Bad request. Error: ", err);
        // }

        //JXL.jxlCompress();
    })
});