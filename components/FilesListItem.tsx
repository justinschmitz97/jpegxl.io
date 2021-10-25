import type { FileInfo } from "@pages/index";

import arrow from "@assets/arrow.svg";
import prettyBytes from "pretty-bytes";
import { useEffect, useState } from "react";

export interface FilesListItemProps {
  file: FileInfo;
}

const FilesListItem = (props: FilesListItemProps) => {
  const [originalSize, setOriginalSize] = useState<number>(0);
  const outputSize = props.file.converted?.length;
  const percentageSaved =
    originalSize === 0
      ? 0
      : Math.max(Math.ceil((1 - outputSize / originalSize) * 100), 0);

  const downloadFile = (buffer: any, fileName: string) => {
    if (buffer !== null) {
      const saveByteArray = (function () {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        return function (data: any, name: string) {
          const blob = new Blob(data, { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = name;
          a.click();
          window.URL.revokeObjectURL(url);
        };
      })();

      saveByteArray(
        [buffer],
        fileName.split(".").slice(0, -1).join(".") + ".jxl"
      );
    }
  };

  useEffect(() => {
    setOriginalSize(props.file.buffer.length);
  }, []);

  return (
    <div
      className={` text-tiny text-white conversion justify-between w-full relative z-10 flex flex-row items-center self-auto mt-3 py-1 bg-bg-600 overflow-hidden rounded-md${
        props.file.converted
          ? " pointer-events-auto bg-bg-600"
          : " pointer-events-none progress group"
      }`}
      data-transition-style={props.file.converted ? "bounceIn" : ""}
    >
      <div className="flex flex-col justify-between items-baseline py-2 ml-2">
        <p className="overflow-hidden relative z-50 font-bold whitespace-nowrap select-none overflow-ellipsis">
          {props.file.name.split(".").slice(0, -1)}
        </p>
        <div className="flex my-1">
          <p className="z-50 py-1 px-2 mr-2 rounded-sm text-tiny bg-red-1000">
            <span className="conversion_format">
              {props.file.name.split(".")[1]} | {prettyBytes(originalSize)}
            </span>
          </p>
          {props.file.converted && (
            <p className="z-50 py-1 px-2 rounded-sm text-tiny bg-green-1000">
              jxl | {prettyBytes(outputSize, { maximumFractionDigits: 0 })} | -
              {percentageSaved}%
            </p>
          )}
        </div>
      </div>
      {props.file.converted === null ? (
        <div className="flex items-center mr-2 w-auto group">
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => downloadFile(props.file.converted, props.file.name)}
          title={`download ${props.file.name}`}
          className={`group absolute top-0 right-0 w-6 h-full cursor-pointer transform ${
            props.file.converted ? "" : "hidden"
          }`}
        >
          {" "}
          <span
            style={{ backgroundSize: "200%" }}
            className="absolute top-0 right-0 bottom-0 left-0 bg-center bg-cover rounded-md cursor-pointer download_button bg-gradient"
          ></span>
          <span
            className="absolute top-0 right-0 bottom-0 left-0 z-50 text-white bg-center bg-no-repeat transition-all duration-300 ease-in transform rotate-180 hover:scale-110 hover:translate-y-1"
            style={{
              backgroundImage: `url(${arrow})`,
              backgroundSize: "30%",
            }}
          ></span>
        </button>
      )}
    </div>
  );
};

export default FilesListItem;
