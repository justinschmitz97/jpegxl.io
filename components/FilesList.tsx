import type { FileInfo } from "@pages/index";
import FilesListItem from "./FilesListItem";
import Link from "@components/Link";
import JSZip from "jszip";

export interface FilesListProps {
  files: FileInfo[];
}

const FilesList = (props: FilesListProps) => {
  const downloadZip = () => {
    const zip = new JSZip();

    for (let i = 0; i < props.files.length; i++) {
      zip.file(
        props.files[i].name + ".jxl",
        new Blob([props.files[i].converted], { type: "octet/stream" }),
        { binary: true }
      );
    }

    zip.generateAsync({ type: "blob" }).then(function (content: any) {
      const saveByteArray = (function () {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        return function (blob: any, name: string) {
          const url = window.URL.createObjectURL(blob);
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
    <>
      {props.files.map((file, index) => {
        return <FilesListItem key={index} file={file} />;
      })}
      <div
        className={`block h-auto mt-8 ${
          props.files.length > 1 ? "" : "hidden"
        }`}
      >
        <button
          className="py-3 px-4 mx-auto mb-4 bg-gradient"
          onClick={downloadZip}
        >
          {" "}
          Download all images{" "}
        </button>
        Enjoying jpegxl.io?
        <Link
          className="underline"
          text="Join our Discord!"
          href="discord.com/invite/6w42YpF5hm"
        />
      </div>
    </>
  );
};

export default FilesList;
