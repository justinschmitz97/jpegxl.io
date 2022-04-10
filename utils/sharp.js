/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const output = "../public/img/";
const input = "../images/";
const webpQuality = { quality: 64, reductionEffort: 5 };
const avifQuality = { quality: 51, speed: 1, chromaSubsampling: "4:2:0" };
const sizes = [768, 576, 384];
fs.readdir(input, (err, files) => {
  console.log("Found " + files.length + " files. Converting now..");
  files.forEach((file) => {
    let fileShort = path.parse(file).name;
    function convert(size) {
      sharp(input + file)
        .webp(webpQuality)
        .resize({ width: size })
        .toFile(output + fileShort + "-" + size + ".webp");
      sharp(input + file)
        .avif(avifQuality)
        .resize({ width: size })
        .toFile(output + fileShort + "-" + size + ".avif");
    }
    for (let i = 0; i < sizes.length; i++) {
      convert(sizes[i]);
    }
  });
});
