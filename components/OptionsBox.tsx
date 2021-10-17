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
  const [quality, setQuality] = useState(100);
  const [distance, setDistance] = useState(1);
  const [effort, setEffort] = useState(5);
  const [bitdepth, setBitDepth] = useState(0);
  const [fasterDecoding, setFasterDecoding] = useState(0);
  const [epf, setEpf] = useState("-1");
  const [resampling, setResampling] = useState("1");
  const [colorspace, setColorspace] = useState("0");
  const [colortransform, setColortransform] = useState("1");
  const [qualityMode, setQualityMode] = useState(QualityMode.Distance);
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
    fasterDecoding,
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
        <h2 className="mb-1">Settings</h2>
        <div className="mb-4 text-tiny whitespace-nowrap">
          Settings don't change a running conversion.
        </div>
        <div className="my-4"></div>
        <div>
          <div>
            <p className="font-bold">Approach</p>
            <div className="p-3 mb-4 rounded-md bg-bg-500">
              <div className="mb-1" id="quality">
                <div className="flex items-center">
                  <label className="text-none" htmlFor="quality_radio">
                    Quality
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

                  <p>Quality</p>
                  <Tooltip text="?">
                    Compressed based on fixed quality parameter. 100 =
                    mathematically lossless. Higher equals higher quality.
                  </Tooltip>
                </div>
              </div>

              <div id="distance">
                <div className="flex items-center mb-2">
                  <label className="text-none" htmlFor="distance_radio">
                    Distance
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

                  <p>Distance</p>
                  <Tooltip text="?">
                    Compress image based on psychovisual similarity. 0 equals
                    mathematically losless. 1 equals visually lossless. Lower
                    numbers equal higher quality.
                  </Tooltip>
                </div>
                <div className={`flex content-center items-center `}>
                  {useDistance && (
                    <>
                      <label className="text-none">
                        Distance
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
                      <b style={{ marginLeft: 10 }}>{distance}</b>
                    </>
                  )}
                  {useQuality && (
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
          <p className="font-bold">Speed</p>
          <div className="p-4 mb-4 rounded-md bg-bg-500">
            <div className="mb-1" id="effort">
              <div className="flex items-center">
                <p>Effort</p>
                <Tooltip text="?">
                  Processing power. More effort equals longer time of
                  conversion, but better compression.
                </Tooltip>
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

            <div id="fasterdecoding">
              <div className="flex items-center">
                <p>Faster Decoding</p>
                <Tooltip text="?">
                  Favour higher decoding speed. 0 = default, higher values give
                  higher speed at the expense of quality
                </Tooltip>
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
            <div
              className="flex items-center"
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                setExpertFeatures(!expertFeatures);
              }}
              onClick={() => {
                setExpertFeatures(!expertFeatures);
              }}
            >
              <input
                checked={expertFeatures}
                onChange={(e) => {
                  setExpertFeatures(e.target.checked);
                }}
                type="checkbox"
                id="expertFeatures"
              />{" "}
              <span className="font-bold">Expert Settings</span>
            </div>
            <div
              className={`mb-4 p-4 rounded-md bg-bg-500 ${
                expertFeatures ? "" : "hidden"
              }`}
            >
              <div className="flex justify-between items-center">
                <label htmlFor="flexCheckDefault">
                  {" "}
                  <Tooltip text="?">
                    Enable progressive / responsive decoding.
                  </Tooltip>
                  Progressive{" "}
                </label>
                <input
                  checked={progressive}
                  onChange={(e) => {
                    setProgressive(e.target.checked);
                  }}
                  type="checkbox"
                  id="flexCheckDefault"
                />
              </div>

              <div className="flex justify-between items-center">
                <label htmlFor="epf">
                  {" "}
                  <Tooltip text="?">
                    Edge preserving filter level (-1 = choose based on quality,
                    default)
                  </Tooltip>
                  EPF{" "}
                </label>
                <select
                  value={epf}
                  onChange={(e) => {
                    setEpf(e.target.value);
                  }}
                  onBlur={(e) => {
                    setEpf(e.target.value);
                  }}
                  id="epf"
                >
                  <option value="-1">-1</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="resampling">
                  {" "}
                  <Tooltip text="?">
                    Subsample all color channels by this factor, or use 0 to
                    choose the resampling factor based on distance.
                  </Tooltip>
                  Resampling{" "}
                </label>
                <select
                  value={resampling}
                  onChange={(e) => {
                    setResampling(e.target.value);
                  }}
                  onBlur={(e) => {
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
              <div className="flex justify-between items-center">
                <label htmlFor="colorspace">
                  {" "}
                  <Tooltip text="?">
                    Choose color organization technique.
                  </Tooltip>
                  Colorspace{" "}
                </label>
                <select
                  value={colorspace}
                  onChange={(e) => {
                    setColorspace(e.target.value);
                  }}
                  onBlur={(e) => {
                    setColorspace(e.target.value);
                  }}
                  id="colorspace"
                >
                  <option value="0">RGB</option>
                  <option value="1">YCoCg</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="colortransform">
                  {" "}
                  <Tooltip text="?">
                    Choose old (YCbCr) or new (XYB) color space mode
                  </Tooltip>
                  Transform{" "}
                </label>

                <select
                  value={colortransform}
                  onChange={(e) => {
                    setColortransform(e.target.value);
                  }}
                  onBlur={(e) => {
                    setColortransform(e.target.value);
                  }}
                  id="colortransform"
                >
                  <option value="1">None</option>
                  <option value="0">XYB</option>
                  <option value="2">YCbCr</option>
                </select>
              </div>
              <div className={`flex items-center justify-between`}>
                <label htmlFor="override_bitdepth">
                  {" "}
                  <Tooltip text="?">
                    If nonzero, store the given bit depth in the JPEG XL file
                    metadata
                  </Tooltip>
                  Bitdepth{" "}
                </label>
                <b style={{ marginLeft: 10 }}>
                  {bitdepth == 0 ? "original" : bitdepth}
                </b>
              </div>
              <input
                value={bitdepth}
                onChange={(e) => {
                  setBitDepth(+e.target.value);
                }}
                type="range"
                min="0"
                max="32"
                step="1"
                id="override_bitdepth"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsBox;
