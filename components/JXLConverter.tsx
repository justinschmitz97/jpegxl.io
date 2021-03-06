import type { FileInfo } from "@pages/index";
import { useState, useEffect } from "react";
import { Options } from "./OptionsBox";

export interface JXLConverterProps {
  options: Options | null;
  files: FileInfo[];
  onFileConverted(name: string, buffer: any): void;
}

interface ConvertWorker {
  worker: Worker;
  name: string;
}

const JXLConverter = (props: JXLConverterProps) => {
  const [workers, setWorkers] = useState<ConvertWorker[]>([]);

  useEffect(() => {
    const sizeLimit = 4; // limit of megabytes for image per worker
    const bytesInMb = 1048576; // bytes in megabyte to convert
    const imagesSize = 0;
    const convertWorkers = workers;

    for (let i = 0; i < props.files.length; i++) {
      const fileName = props.files[i].name;
      const index = workers.findIndex((e) => {
        if (e.name === fileName) return true;
      });

      if (props.files[i].converted === null && index === -1) {
        const currImageSize = props.files[i].buffer.length / bytesInMb;
        if (
          imagesSize + currImageSize > sizeLimit &&
          convertWorkers.length !== 0
        )
          break;

        const worker = new Worker("worker.js");

        worker.onmessage = (e) => {
          setWorkers((prev) => {
            const index = prev.findIndex((e) => {
              return e.name === fileName;
            });
            const result = [...prev];
            if (index !== -1) {
              result[index].worker.terminate();
              result.splice(index, 1);
            }
            return result;
          });
          props.onFileConverted(fileName, e.data.buffer);
        };

        worker.postMessage({
          buffer: props.files[i].buffer,
          options: props.options,
        });
        convertWorkers.push({ worker: worker, name: fileName });
      }
    }
    setWorkers(convertWorkers);
  }, [props.files]);

  return null;
};

export default JXLConverter;
