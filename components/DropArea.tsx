import OptionsBox, { Options } from "./OptionsBox";
import { useState } from "react";

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

  return (
    <div className="dropBackground">
      <a
        onClick={openFileDialog}
        onDrop={filesDroped}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        role="button"
        className="dropArea"
        href=""
      >
        <div className="arrowButton">BROWSE</div>
        <p className="dropInfoLabel">Drop images or browse</p>
        <p className="formatsLabel">
          supports png • jpg • webp • avif and more
        </p>
        <button onClick={openOptions} className="optionsButton">
          Options
        </button>
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
    </div>
  );
};

export default DropArea;
