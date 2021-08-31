document.addEventListener('DOMContentLoaded', function () {
    JXL().then(function(JXL){
        JXL = JXL;
        
        let url = "image/flower_foveon.png.im_q85_420_progr.jpg"

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";

        xhr.onload = function (e) {
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
                  
                let options = JXL.createOptions();

                let result = JXL.jxlCompress(buffer, buffer_size, options);
                
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

                saveByteArray([result], 'test-jpeg.jxl');
            }
        };

        xhr.send();
    })
});