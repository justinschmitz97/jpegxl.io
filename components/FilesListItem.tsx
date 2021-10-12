import type { FileInfo } from "@pages/index";

import arrow from "@assets/arrow.svg";

export interface FilesListItemProps {
  file: FileInfo;
}

const FilesListItem = (props: FilesListItemProps) => {
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

  return (
    <div
      className={`h-7 text-tiny text-white conversion justify-between w-full relative z-10 flex flex-row items-center self-auto mt-3 py-1 bg-bg-600 overflow-hidden rounded-md${
        props.file.converted
          ? " pointer-events-auto bg-bg-600"
          : " pointer-events-none progress group"
      }`}
      data-transition-style={props.file.converted ? "bounceIn" : ""}
    >
      <div className="flex flex-col justify-between items-baseline py-2 ml-3">
        <p className="overflow-hidden relative z-50 font-bold whitespace-nowrap select-none overflow-ellipsis">
          {props.file.name}
        </p>
      </div>
      {props.file.converted === null ? (
        <div className="group absolute top-0 right-0 w-auto h-full overflow-hidden cursor-pointer transform">
          <span>Loading...</span>
        </div>
      ) : (
        <button
          onClick={() => downloadFile(props.file.converted, props.file.name)}
          title={`download ${props.file.name}`}
          className={`group absolute top-0 right-0 w-6 h-full overflow-hidden cursor-pointer transform ${
            props.file.converted ? "" : "hidden"
          }`}
        >
          {" "}
          <span
            style={{ backgroundSize: "200%" }}
            className="absolute top-0 right-0 bottom-0 left-0 bg-center bg-cover rounded-r-md cursor-pointer bg-gradient"
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
