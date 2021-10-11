# avif.io

This Github repo is the source code behind the website [avif.io](https://avif.io). You can use avif.io to convert a wide variety of file formats into AVIF, directly inside your web browser.

<br/>

## Background & State

This source code has been published in July 2021. Feel free to create issues or pull requests. We appreciate any help!

This project has been started by Justin (UX Designer) & Niksa (Developer). Each project comes with a set of responsibilities. As a two-person team involved in our day-to-day jobs and family, we could not dedicate the time necessary to keep the development as steady as we would have liked. Due to the fast-paced nature of the project, we thought it would be best to provide people with the ability to create their own versions and work on their own features. Multiple requests have been made for the source code to be released. Many people have asked how they can assist us with the development. We are pleased to announce that we are now an open-source project. Besides making the development process easier, the general public is also able to gain insight into how and what data we process. Due to the fact that file converters typically save your images in the cloud, being open-source provides people with the confidence that their images are secure

<br/>

## Advantages

1. Converted files are never sent to the server
2. The entire conversion process is performed locally
3. Unlimited conversions, even in bulk
4. Flexible and userfriendly interface
5. Options to change quality and effort

<br/>

## How does the conversion work?

We use [Rust](https://rust-lang.org/) with [wasm-pack](https://github.com/rustwasm/wasm-pack)
to compile a converter library into WASM and call the Rust code
in the browser, from a WebWorker. The program uses Rust's
[image library](https://crates.io/crates/image) to decode files,
and for encoding to AVIF we use a fork of [rav1e](https://github.com/ennmichael/rav1e)
modified to allow for proper progress updates.
The Rust code is in `conversion/`.

<br/>
<br/>

# Technical Details

<br/>

## Frontend Code

The root of the project is a [Next.js](https://nextjs.org) application
written in [TypeScript](https://typescriptlang.org/), based on [React](https://reactjs.org/) and [Preact](https://preactjs.com/).
You can run the application via `npm start`, and watch and reload the
files via `npm develop`. The `wasm-pack`ed Rust code ends up in `public/dist`.

<br/>

## Rust Code

Building Rust requires `cargo` and `make`. To build the wasm
code for release, use:

```bash
cd conversion/
make wasm
```

This will also run webpack to move the produced WASM and JS
files to `public/dist`. Keep in mind that when you clone the repository
the Rust code will already have been compiled, so you don't have to
do this step yourself.

Using make, you can use `make wasm-debug` to build the WASM code
for debugging, or use `make demo-debug` to build a demo binary
to test out the Rust code in a non-WASM environment.

<br/>

## WebP

At the time of writing, the `image` library has very incomplete
support for the WebP format. Instead, we use a special build of
[libwebp](https://github.com/webmproject/libwebp/) called webp_js,
which allows us to decode WebP files in the browser using the
canvas web API. This is important to keep in mind — WebP handling
is a special case at the moment, so don't be surprised that some
of the code is explicitly checking whether it's working with WebP.

<br/>

## Installing dependencies and building the front-end

You can find the related commands in the package.json file.

<br/>

# Special thanks to all contributors:

1. ennmichael / Nikša
2. mikqi / Muhammad Rivki
3. ageofadz / Sam Robertson
