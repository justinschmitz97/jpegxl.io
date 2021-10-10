import type { FileInfo } from "../pages/index";
export interface FilesListItemProps {
  file: FileInfo;
}

const FilesListItem = (props: FilesListItemProps) => {
  const downloadFile = (buffer: any, fileName: string) => {
    if (buffer !== null) {
      const saveByteArray = (function () {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        return function (data: any, name: string) {
          let blob = new Blob(data, { type: "octet/stream" }),
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
    <div className="listItem">
      <div
        className="spinnerContainer"
        style={{
          visibility: `${props.file.converted === null ? "visible" : "hidden"}`,
        }}
      >
        <div className={"spinner-grow"} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <p className="itemLabel">{props.file.name}</p>
      <button
        onClick={() => downloadFile(props.file.converted, props.file.name)}
        className={`downloadButton ${
          props.file.converted !== null
            ? "convertedDownloadBackground"
            : "loadingDownloadBackground"
        }`}
      >
        Download
      </button>
    </div>
  );
};

export default FilesListItem;
