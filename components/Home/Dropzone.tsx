import { useDropzone } from "react-dropzone";
import arrow from "@assets/arrow.svg";

export interface DropzoneProps {
  onDrop(files: File[]): void;
}

export default function Dropzone(props: DropzoneProps) {
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

  function onBrowseClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    open();
  }

  return (
    <a
      href="#"
      role="button"
      style={{
        boxShadow: `${isDragActive ? "0 0 0 2000px rgb(0 0 0 / 95%)" : "none"}`,
        zIndex: isDragActive ? 9999 : 50,
      }}
      aria-label="This is the dropzone. Choose your images here to convert them to AVIF"
      onClick={onBrowseClick}
      className={`z-50 order-first h-full bg-white-500 w-full rounded-xl ease-out duration-200 text-center playstate group`}
    >
      <div
        className={
          " text-center py-7 px-3 text-blue-400 bg-white rounded-xl group transform"
        }
        {...getRootProps()}
      >
        <input {...getInputProps()} />
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
        <div className="text-gray-400 text-tiny md:text-default">
          supports png · jpg · webp · gif and more
        </div>
      </div>
    </a>
  );
}
