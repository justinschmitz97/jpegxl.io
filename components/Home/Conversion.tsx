import ProgressBar from "@components/Home/ProgressBar";
import { Settings } from "@components/Home/SettingsBox";
import ConversionTimeEstimator from "@utils/ConversionTimeEstimator";
import Converter, { ConversionId, ConversionResult } from "@utils/converter";
import { splitNameAndExtension } from "@utils/utils";
import prettyBytes from "pretty-bytes";
import { ReactElement, useEffect, useState } from "react";
import Tooltip from "@components/Home/Tooltip";

import arrow from "@assets/arrow.svg";

export interface ConversionProps {
  file: File;
  converter: Converter;
  settings: Settings;
  onFinished(outputFile: File): void;
}

function formatRemainingTimeEstimate(estimator: ConversionTimeEstimator) {
  if (estimator.minutes === undefined) return "";
  if (estimator.seconds === undefined) return "";
  if (estimator.minutes === 0 && estimator.seconds === 0) return "almost ready";
  let result = "";
  if (estimator.minutes !== 0) {
    result += `${estimator.minutes} minute`;
    if (estimator.minutes > 1) {
      result += "s";
    }
  } else {
    result += `${estimator.seconds} seconds`;
  }
  result += " left";
  return result;
}

type ConversionStatus = "inProgress" | "cancelled" | "finished";

export default function Conversion(props: ConversionProps): ReactElement {
  const [status, setStatus] = useState<ConversionStatus>("inProgress");
  const [fileName, setFileName] = useState<string>();
  const [originalFormat, setOriginalFormat] = useState<string>();
  const [originalSize] = useState(props.file.size);
  const [progress, setProgress] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const [outputObjectURL, setOutputObjectURL] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [conversionId, setConversionId] = useState<ConversionId>();
  const [conversionTimeEstimator] = useState(
    new ConversionTimeEstimator(50, 300)
  );

  useEffect(() => {
    (async () => {
      const [fileName, format] = splitNameAndExtension(props.file.name);
      setFileName(fileName);
      setOriginalFormat(format);
      conversionTimeEstimator.start();

      function onFinished(result: ConversionResult) {
        setStatus("finished");
        const outputFile = new File([result.data], `${fileName}.avif`);
        setOutputObjectURL(URL.createObjectURL(outputFile));
        setOutputSize(result.data.length);
        props.onFinished(outputFile);
      }

      function onProgress(progress: number) {
        setProgress(progress);
        conversionTimeEstimator.update(progress);
        setRemainingTime(formatRemainingTimeEstimate(conversionTimeEstimator));
      }

      setConversionId(
        await props.converter.convertFile(props.file, {
          ...props.settings,
          onFinished,
          onProgress,
          onError(e: string) {
            console.error(e);
            confirm(
              "Oh no, the conversion has failed. This happens most likely due to your image having the wrong file ending. Please check and try again."
            );
          },
        })
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const percentageSaved = Math.max(
    Math.ceil((1 - outputSize / originalSize) * 100),
    0
  );

  function cancelConverison() {
    if (status === "inProgress" && conversionId !== undefined) {
      props.converter.cancelConversion(conversionId);
      setStatus("cancelled");
    }
  }

  const finished = status === "finished";
  const cancelled = status === "cancelled";

  return (
    <div
      className={`text-tiny text-white conversion justify-between w-full relative z-10 flex flex-row items-center self-auto mt-3 py-1 bg-bg-600 overflow-hidden rounded-md${
        finished ? " pointer-events-auto bg-bg-600" : " progress group"
      } ${cancelled ? "hidden" : ""}`}
      data-transition-style={finished ? "bounceIn" : ""}
    >
      <div className="flex flex-col justify-between items-baseline py-2 ml-3">
        <p className="overflow-hidden relative z-50 font-bold whitespace-nowrap select-none overflow-ellipsis">
          {typeof fileName === "string" && fileName.length > 40
            ? fileName.substring(0, 40) + "[..]"
            : fileName}
          {finished ? ".avif " : `.${originalFormat}`}
        </p>
        <div className="flex my-1">
          <p className="z-50 py-1 px-2 mr-2 rounded-sm text-tiny bg-green-1000">
            <span className="conversion_format">
              {originalFormat} | {prettyBytes(originalSize)}
            </span>
          </p>
          {finished && (
            <p className="z-50 py-1 px-2 rounded-sm text-tiny bg-green-1000">
              avif |{" "}
              {prettyBytes(outputSize, { maximumFractionDigits: 0 }) +
                " | -" +
                percentageSaved +
                "%"}
            </p>
          )}
        </div>
      </div>
      <p className={`hidden md:flex z-50 text-tiny rounded-sm  px-2 py-1`}>
        {!finished &&
          (remainingTime !== "" ? remainingTime + " · " : "") +
            (progress * 100).toFixed() +
            "%"}
        {percentageSaved === 0 && (
          <Tooltip text="Why 0%?">
            explanation="Adjust your conversion settings to achieve higher
            compression."
          </Tooltip>
        )}
        {status === "inProgress" && (
          <a
            role="button"
            title="stop conversion"
            className="flex left-full z-50 justify-center items-center pb-1 ml-1 w-4 h-4 text-teal-400 rounded-lg opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 bg-green-1000"
            onClick={cancelConverison}
            onKeyPress={cancelConverison}
            tabIndex={0}
          >
            ■
          </a>
        )}
      </p>
      {finished && (
        <a
          download={`${fileName}.avif`}
          tabIndex={0}
          role="button"
          href={outputObjectURL}
        >
          <button
            title={`download ${fileName}`}
            className={`group absolute top-0 right-0 w-6 h-full overflow-hidden cursor-pointer transform ${
              finished ? "" : "hidden"
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
        </a>
      )}
      {status === "inProgress" && <ProgressBar progress={progress} />}
    </div>
  );
}
