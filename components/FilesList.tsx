import type { FileInfo } from "../pages/index";
import FilesListItem from "./FilesListItem";
import JSZip from "jszip";

export interface FilesListProps {
  files: FileInfo[];
}

const FilesList = (props: FilesListProps) => {
  const zipButtonVisibility = props.files.length === 0 ? "hidden" : "visible";

  const downloadZip = () => {
    var zip = new JSZip();

    for (let i = 0; i < props.files.length; i++) {
      zip.file(
        props.files[i].name + ".jxl",
        new Blob([props.files[i].converted], { type: "octet/stream" }),
        { binary: true }
      );
    }

    zip.generateAsync({ type: "blob" }).then(function (content: any) {
      const saveByteArray = (function () {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        return function (blob: any, name: string) {
          let url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = name;
          a.click();
          window.URL.revokeObjectURL(url);
        };
      })();
      saveByteArray(content, "images.zip");
    });
  };

  return (
    <div>
      <div className="listContainer">
        <button
          onClick={downloadZip}
          style={{ visibility: zipButtonVisibility }}
          className="downloadZipButton"
        >
          Download zip
        </button>
        {props.files.map((file, index) => {
          return <FilesListItem key={index} file={file} />;
        })}
      </div>
    </div>
  );
};

export default FilesList;
