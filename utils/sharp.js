/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const output = "../public/img/";
const input = "../images/";
const jpgQuality = { mozjpeg: true, quality: 50, progressive: true };
const webpQuality = { quality: 48, reductionEffort: 3 };
const avifQuality = { quality: 55, speed: 3 };
const sizes = [1536, 768, 576, 384];
fs.readdir(input, (err, files) => {
  console.log(
    "Found " + files.length + " files. Converting now, please be patient.."
  );
  files.forEach((file) => {
    let fileShort = path.parse(file).name;
    function convert(size) {
      sharp(input + file)
        .jpeg(jpgQuality)
        .resize({ width: size })
        .toFile(output + fileShort + "-" + size + ".jpg");
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

fs.copyFile(
  "../images/comparison.jpg",
  "../public/img/comparison.jpg",
  (err) => {
    if (err) throw err;
  }
);
