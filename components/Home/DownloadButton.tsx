import Link from "@components/Link";
import { saveFile } from "@utils/utils";
import JSZip from "jszip";

export interface DownloadButtonProps {
  files: File[];
}

export default function DownloadButton(props: DownloadButtonProps) {
  async function onClick() {
    const zip = new JSZip();
    for (const file of props.files)
      zip.file(file.name, await file.arrayBuffer());
    const data = await zip.generateAsync({ type: "blob" });
    saveFile(new File([data], "images.zip"));
  }

  return (
    <div
      className={`block h-auto mt-8 ${props.files.length > 1 ? "" : "hidden"}`}
    >
      <button className="py-3 px-4 mx-auto mb-4 bg-gradient" onClick={onClick}>
        {" "}
        Download all images{" "}
      </button>
      Enjoying avif.io?
      <Link
        className="underline"
        text="Join our Discord!"
        href="discord.com/invite/6w42YpF5hm"
      />
    </div>
  );
}
