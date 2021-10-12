import { useEffect, useState } from "react";
import Tooltip from "@components/Home/Tooltip";

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
  open: boolean;
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
  const [expertFeatures, setExpertFeatures] = useState(false);

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

  return (
    <div
      className={
        "absolute top-0 left-full ml-4 w-24 h-auto p-4 bg-bg-700 rounded-md ease-out transform transition-all duration-500 origin-left" +
        (props.open
          ? " opacity-100 translate-x-0 scale-100"
          : " opacity-0 -translate-x-12 scale-0")
      }
    >
      <div className={"text-left" + " " + (props.open ? "open" : "closed")}>
        <h2 className="mb-1">Conversion settings</h2>
        <div className="mb-4 text-tiny">
          Settings don't change a running conversion.
        </div>
        <div className="my-4"></div>
        <div>
          <div>
            <p className="font-bold">Conversion Approach</p>
            <div className="mb-4 p-4 rounded-md bg-bg-500">
              <div className="mb-1" id="quality">
                <div className="flex items-center">
                  <label className="text-none" htmlFor="quality_radio">
                    Fixed Quality
                  </label>
                  <input
                    checked={useQuality}
                    onChange={(e) =>
                      setQualityModeCheck(e.target.checked, e.target.value)
                    }
                    type="radio"
                    value={QualityMode.Quality}
                    name="options"
                    id="quality_radio"
                  />

                  <p>Fixed Quality</p>
                  <Tooltip text="?">Explanation</Tooltip>
                </div>
              </div>

              <div id="distance">
                <div className="flex items-center mb-2">
                  <label className="text-none" htmlFor="distance_radio">
                    Structural Similarity
                  </label>
                  <input
                    checked={useDistance}
                    onChange={(e) =>
                      setQualityModeCheck(e.target.checked, e.target.value)
                    }
                    type="radio"
                    value={QualityMode.Distance}
                    name="options"
                    id="distance_radio"
                  />

                  <p>Structural Similarity</p>
                  <Tooltip text="?">Explanation</Tooltip>
                </div>
                <div className={`flex content-center items-center `}>
                  {useDistance ? (
                    <>
                      <label className="text-none">
                        Structural Similarity
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
                      </label>
                      <b style={{ marginLeft: 10 }}>{distance * 4}%</b>
                    </>
                  ) : (
                    <>
                      <label className="text-none">
                        Quality
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
                      </label>
                      <b style={{ marginLeft: 10 }}>{quality}%</b>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="font-bold">Conversion Speed</p>
          <div className="mb-4 p-4 rounded-md bg-bg-500">
            <div className="mb-1" id="effort">
              <div className="flex items-center">
                <p>Effort</p>
                <Tooltip text="?">Explanation</Tooltip>
              </div>
              <div className={`flex content-center items-center`}>
                <label className="text-none">
                  Effort
                  <input
                    value={effort}
                    onChange={(e) => {
                      setEffort(+e.target.value);
                    }}
                    type="range"
                    min="1"
                    max="9"
                    step="1"
                    id="effort"
                  />
                </label>
                <b style={{ marginLeft: 10 }}>{(effort + -1) * 12.5}%</b>
              </div>
            </div>
            {/*
            <div className="mb-3" id="bitdepth">
              <div className="flex items-center">
                <p className="font-bold">Bitdepth</p>
                <Tooltip text="?">Explanation</Tooltip>
              </div>
              <div className={`flex content-center items-center`}>
                <label className="text-none">
                Bitdepth
                  <input
                    value={bitdepth}
                    onChange={(e) => {
                      setBitdepth(+e.target.value);
                    }}
                    type="range"
                    min="0"
                    max="32"
                    step="1"
                    id="override_bitdepth"
                  />
                </label>
                <b style={{ marginLeft: 10 }}>{(bitdepth + -1) * 12.5}%</b>
              </div>
                  </div>*/}

            <div id="fasterdecoding">
              <div className="flex items-center">
                <p>Faster Decoding</p>
                <Tooltip text="?">Explanation</Tooltip>
              </div>
              <div className={`flex content-center items-center`}>
                <label className="text-none">
                  Faster Decoding
                  <input
                    value={fasterDecoding}
                    onChange={(e) => {
                      setFasterDecoding(+e.target.value);
                    }}
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    id="faster_decoding"
                  />
                </label>
                <b style={{ marginLeft: 10 }}>{fasterDecoding * 25}%</b>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <input
                checked={expertFeatures}
                onChange={(e) => {
                  setExpertFeatures(e.target.checked);
                }}
                type="checkbox"
                id="experFeatures"
              />{" "}
              <span className="font-bold">Expert Settings</span>
            </div>
            <div
              className={`mb-4 p-4 rounded-md bg-bg-500 ${
                expertFeatures ? "" : "hidden"
              }`}
            >
              <div>
                <label htmlFor="flexCheckDefault">Progressive</label>
                <input
                  checked={progressive}
                  onChange={(e) => {
                    setProgressive(e.target.checked);
                  }}
                  type="checkbox"
                  id="flexCheckDefault"
                />
              </div>
              <div>
                <label htmlFor="epf">Epf</label>
                <select
                  value={epf}
                  onChange={(e) => {
                    setEpf(e.target.value);
                  }}
                  id="epf"
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
                >
                  <option value="1">None</option>
                  <option value="0">XYB</option>
                  <option value="2">YCbCr</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsBox;
