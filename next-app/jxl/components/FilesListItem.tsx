import type { FileInfo } from "../pages/index";
import styles from "../styles/FilesListItem.module.css";
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
    <div className={styles.listItem}>
      <div
        className={styles.spinnerContainer}
        style={{
          visibility: `${props.file.converted === null ? "visible" : "hidden"}`,
        }}
      >
        <div className={"spinner-grow"} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <p className={styles.itemLabel}>{props.file.name}</p>
      <button
        onClick={() => downloadFile(props.file.converted, props.file.name)}
        className={[
          styles.downloadButton,
          props.file.converted !== null
            ? styles.convertedDownloadBackground
            : styles.loadingDownloadBackground,
        ].join(" ")}
      >
        Download
      </button>
    </div>
  );
};

export default FilesListItem;
