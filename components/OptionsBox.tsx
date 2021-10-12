import { useEffect, useState } from "react";

export interface Options {
  progressive: boolean;
  quality: number;
  distance: number;
  effort: number;
  override_bitdepth: number;
  epf: number;
  resampling: number;
  colorspace: number;
  colortransform: number;
  faster_decoding: number;
  quality_mode: string;
}

enum QualityMode {
  Quality = "quality",
  Distance = "distance",
}

export interface OptionsBoxProps {
  anchorElement: HTMLButtonElement | null;
  onOptionsChanged(options: Options): void;
  onClose(): void;
}

const OptionsBox = (props: OptionsBoxProps) => {
  const [progressive, setProgressive] = useState(false);
  const [quality, setQuality] = useState(0);
  const [distance, setDistance] = useState(0);
  const [effort, setEffort] = useState(1);
  const [bitdepth] = useState(0);
  const [fasterDecoding, setFasterDecoding] = useState(0);
  const [epf, setEpf] = useState("1");
  const [resampling, setResampling] = useState("1");
  const [colorspace, setColorspace] = useState("0");
  const [colortransform, setColortransform] = useState("1");
  const [qualityMode, setQualityMode] = useState(QualityMode.Quality);

  const useQuality = qualityMode === QualityMode.Quality;
  const useDistance = qualityMode === QualityMode.Distance;

  const setQualityModeCheck = (checked: boolean, mode: string) => {
    if (checked) setQualityMode(mode as QualityMode);
  };

  useEffect(() => {
    const options: Options = {
      progressive: progressive,
      quality: quality,
      distance: distance,
      effort: effort,
      override_bitdepth: bitdepth,
      faster_decoding: fasterDecoding,
      epf: +epf,
      resampling: +resampling,
      colorspace: +colorspace,
      colortransform: +colortransform,
      quality_mode: qualityMode,
    };

    props.onOptionsChanged(options);
  }, [
    progressive,
    quality,
    distance,
    effort,
    bitdepth,
    epf,
    resampling,
    colorspace,
    colortransform,
    qualityMode,
  ]);

  const open = Boolean(props.anchorElement);

  return (
    <>
      <div className={"text-left" + " " + (open ? "open" : "closed")}>
        <h2 className="mb-1">Conversion settings</h2>
        <div className="mb-4">Settings don't change a running conversion.</div>
        <div className="my-4"></div>
        <div>
          <div>
            <input
              checked={useQuality}
              onChange={(e) =>
                setQualityModeCheck(e.target.checked, e.target.value)
              }
              type="radio"
              value={QualityMode.Quality}
              name="options"
              className="radioOption"
              id="quality_radio"
            />
            <label htmlFor="quality_radio">Quality</label>
          </div>
          <div className={`inputRow ${useQuality ? "" : " hideOption"}`}>
            <input
              value={quality}
              onChange={(e) => {
                setQuality(+e.target.value);
              }}
              type="range"
              min="0"
              max="100"
              step="5"
              id="quality"
            />
          </div>
          <div>
            <input
              checked={useDistance}
              onChange={(e) =>
                setQualityModeCheck(e.target.checked, e.target.value)
              }
              type="radio"
              value={QualityMode.Distance}
              name="options"
              className="radioOption"
              id="distance_radio"
            />
            <label htmlFor="distance_radio">Distance</label>
          </div>
          <div className={`inputRow ${useDistance ? "" : " hideOption"}`}>
            <input
              value={distance}
              onChange={(e) => {
                setDistance(+e.target.value);
              }}
              type="range"
              min="0"
              max="25"
              step="1"
              id="distance"
            />
          </div>
          <div>
            <label htmlFor="effort">Effort</label>
            <input
              value={effort}
              onChange={(e) => {
                setEffort(+e.target.value);
              }}
              className="rangeOption"
              type="range"
              min="1"
              max="9"
              step="1"
              id="effort"
            />
          </div>

          {/*<div>
            <label htmlFor="override_bitdepth">Override bitdepth</label>
            <input
              value={bitdepth}
              onChange={(e) => {
                setBitdepth(+e.target.value);
              }}
              className="rangeOption"
              type="range"
              min="0"
              max="32"
              step="1"
              id="override_bitdepth"
            />
            </div>*/}
          <div>
            <label htmlFor="faster_decoding">Faster decoding</label>
            <input
              value={fasterDecoding}
              onChange={(e) => {
                setFasterDecoding(+e.target.value);
              }}
              className="rangeOption"
              type="range"
              min="0"
              max="4"
              step="1"
              id="faster_decoding"
            />
          </div>
          <div>
            <input
              checked={progressive}
              onChange={(e) => {
                setProgressive(e.target.checked);
              }}
              className="checkBoxOption"
              type="checkbox"
              id="flexCheckDefault"
            />
            <label htmlFor="flexCheckDefault">Progressive</label>
          </div>
          <div>
            <label htmlFor="epf">Epf</label>
            <select
              value={epf}
              onChange={(e) => {
                setEpf(e.target.value);
              }}
              id="epf"
              className="selectOption"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label htmlFor="resampling">Resampling</label>
            <select
              value={resampling}
              onChange={(e) => {
                setResampling(e.target.value);
              }}
              id="resampling"
              className="selectOption"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          </div>
          <div>
            <label htmlFor="colorspace">Colorspace</label>
            <select
              value={colorspace}
              onChange={(e) => {
                setColorspace(e.target.value);
              }}
              id="colorspace"
              className="selectOption"
            >
              <option value="0">RGB</option>
              <option value="1">YCoCg</option>
            </select>
          </div>
          <div>
            <label htmlFor="colortransform">Colortransform</label>
            <select
              value={colortransform}
              onChange={(e) => {
                setColortransform(e.target.value);
              }}
              id="colortransform"
              className="selectOption"
            >
              <option value="1">None</option>
              <option value="0">XYB</option>
              <option value="2">YCbCr</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionsBox;
