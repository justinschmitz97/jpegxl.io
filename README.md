# jpegxl.io

This Github repo is the source code behind the website [jpegxl.io](https://jpegxl.io). You can use jpegxl.io to convert a wide variety of file formats (jpeg, png, webp, avif) into JPEGXL, directly inside your web browser.

<br/>

## Background & State

This source code has been published in October 2021. Feel free to create issues or pull requests. I appreciate any help!

<br/>

## Advantages

1. Converted files are never sent to the server
2. The entire conversion process is performed locally
3. Unlimited conversions, even in bulk
4. Flexible and userfriendly interface
5. Several options, including SSIM

<br/>

## How does the conversion work?

We compile a C converter library into WASM and call the code
in the browser, from a WebWorker.

<br/>
<br/>

# Technical Details

<br/>

## Frontend Code

The root of the project is a [Next.js](https://nextjs.org) application
written in [TypeScript](https://typescriptlang.org/), based on [React](https://reactjs.org/) and [Preact](https://preactjs.com/).
You can run the application via `npm start`, and watch and reload the
files via `npm develop`.

<br/>

## Installing dependencies and building the front-end

You can find the related commands in the package.json file.

<br/>

## Privacy

No images are stored anywhere.
We currently use Hotjar, Google Analytics and store the log of your Browser console.
Hotjar allows us to optimize the User Experience. Google Analytics lets us figure out what audience we are serving and if Page Performance is reliable. The browser console logs help us detect errors and bugs in conversion.

As soon as we reach a stable version (~December 21), we will turn off the browser console logs and Hotjar.

<br/>

# Special thanks to all contributors:

1. Antonov548 / Michael
