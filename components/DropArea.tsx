import OptionsBox, { Options } from "./OptionsBox";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import arrow from "@assets/arrow.svg";
import cog from "@assets/settings.svg";

export interface DropAreaProps {
  onDrop(files: File[]): void;
  onOptionsChanged(options: Options): void;
}

const DropArea = (props: DropAreaProps) => {
  const [optionsButton, setOptionsButton] = useState<HTMLButtonElement | null>(
    null
  );

  const openOptions = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setOptionsButton(e.target);
  };

  const openFileDialog = (e: any) => {
    e.preventDefault();
    const input = document.getElementById("file-choose");
    if (input) input.click();
  };

  const filesChoosed = (e: any) => {
    props.onDrop([...e.target.files]);
    e.target.value = "";
  };

  const preventDefault = (e: any) => {
    e.preventDefault();
  };

  const filesDroped = (e: any) => {
    e.preventDefault();
    props.onDrop([...e.dataTransfer.files]);
  };

  const { isDragActive, getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: [
      ".png",
      ".jpg",
      ".jpeg",
      ".webp",
      ".gif",
      ".bmp",
      ".dib",
      ".ico",
      ".tiff",
      ".tif",
      ".pbm",
      ".pgm",
      ".ppm",
      ".pnm",
      ".dds",
      ".tga",
      ".icb",
      ".vda",
      ".vst",
      ".ff",
    ],
    onDropAccepted(files: File[]) {
      props.onDrop(files);
    },
  });

  return (
    <>
      <a
        href=""
        role="button"
        style={{
          boxShadow: `${
            isDragActive ? "0 0 0 2000px rgb(0 0 0 / 95%)" : "none"
          }`,
          zIndex: isDragActive ? 9999 : 50,
        }}
        aria-label="This is the dropzone. Choose your images here to convert them to AVIF"
        onClick={openFileDialog}
        onDrop={filesDroped}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        className={`z-50 order-first h-full bg-white-500 w-full rounded-xl ease-out duration-200 text-center playstate group`}
      >
        <div className="text-center py-7 px-3 text-blue-400 bg-white rounded-xl group transform">
          <div
            className={
              "mx-auto relative w-8 h-8 overflow-hidden rounded-full mb-4 playstate"
            }
          >
            <div
              className="relative z-50 w-full h-full bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${arrow})`,
              }}
            ></div>
            <div
              className="absolute top-0 right-0 bottom-0 left-0 z-10 bg-gradient blur-sm"
              data-transition-style="ctaBackground"
            ></div>
          </div>
          <b>Drop images or browse</b>
          <div className="text-gray-500 text-tiny md:text-default">
            supports png · jpg · webp · gif and more
          </div>

          <button onClick={openOptions} className="optionsButton">
            Options
          </button>

          <button
            aria-label="Conversion settings"
            className={`absolute top-4 right-4 z-50 block w-5 h-5 p-5 cursor-pointer transition-all transform ease-cog duration-300 bg-no-repeat bg-center invisible md:visible ${
              optionsButton ? " rotate-180" : "rotate-0"
            }`}
            style={{
              backgroundImage: `url(${cog})`,
              backgroundSize: 24,
              filter: `${
                optionsButton
                  ? "invert(67%) sepia(18%) saturate(1445%) hue-rotate(130deg) brightness(84%) contrast(82%)"
                  : "none"
              }`,
            }}
            onClick={openOptions}
          ></button>
        </div>
      </a>
      <input
        id="file-choose"
        onChange={filesChoosed}
        type="file"
        className="fileInput"
        multiple
        autoComplete="off"
      />
      <OptionsBox
        anchorElement={optionsButton}
        onOptionsChanged={(options: Options) => {
          props.onOptionsChanged(options);
        }}
        onClose={() => setOptionsButton(null)}
      />
    </>
  );
};

export default DropArea;
