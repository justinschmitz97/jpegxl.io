import OptionsBox, { Options } from "./OptionsBox";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export interface DropAreaProps {
  onDrop(files: File[]): void;
  onOptionsChanged(options: Options): void;
  open: boolean;
}

const DropArea = (props: DropAreaProps) => {
  const [optionsButton, setOptionsButton] = useState<HTMLButtonElement | null>(
    null
  );

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

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
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
        className={`z-50 order-first h-full bg-white-500 w-full rounded-xl ease-out duration-200 text-center playstate group hover:scale-[0.99] transition-all active:scale-[0.95]`}
      >
        <div
          className="py-7 px-3 text-center text-blue-400 bg-white rounded-xl transform group"
          {...getRootProps()}
        >
          <div
            className={
              "mx-auto relative w-8 h-8 overflow-hidden rounded-full mb-4 playstate"
            }
          >
            <div
              className="relative z-50 w-full h-full bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(/assets/arrow.svg)`,
              }}
            ></div>
            <div
              className="absolute top-0 right-0 bottom-0 left-0 z-10 bg-gradient blur-sm"
              data-transition-style="ctaBackground"
            ></div>
          </div>
          <b>Drop images or browse</b>
          <div className="text-gray-500 text-tiny md:text-default">
            supports png · jpg · gif · webp · avif
          </div>
        </div>
      </a>
      <input
        id="file-choose"
        onChange={filesChoosed}
        type="file"
        className="fileInput"
        multiple
        autoComplete="off"
        {...getInputProps()}
      />
      <OptionsBox
        anchorElement={optionsButton}
        onOptionsChanged={(options: Options) => {
          props.onOptionsChanged(options);
        }}
        open={props.open}
        onClose={() => setOptionsButton(null)}
      />
    </>
  );
};

export default DropArea;
