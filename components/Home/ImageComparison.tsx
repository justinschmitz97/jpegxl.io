import { useState } from "react";
import ReactCompareImage from "react-compare-image";

export default function ImageComparison() {
  const [image, setImage] = useState("frog");
  const [imageSize, setImageSize] = useState("30");
  const [support, setSupport] = useState(false);

  new Promise(() => {
    const image = new Image();
    image.onerror = () => setSupport(false);
    image.onload = () => setSupport(true);
    image.src =
      "data:image/jxl;base64,/woIELASCAgQAFwASxLFgkWAHL0xqnCBCV0qDp901Te/5QM=";
  }).catch(() => false);

  const sliderImages = [
    ["frog", "30"],
    ["waterfalls", "116"],
    ["sunflower", "37"],
    ["drop", "16"],
    ["smoke", "58"],
  ];

  const sliderButtons = sliderImages.map((item: any, i) => (
    <button
      key={item[1]}
      style={{ backgroundImage: `url(/comparison/${item[0]}.jxl)` }}
      className={`mr-2 w-8 rounded-md h-8 bg-center bg-cover bg-no-repeat ${
        image == item[0] ? "border-4 border-teal-700" : "opacity-50"
      }`}
      onClick={() => {
        setImage(`${item[0]}`);
        setImageSize(`${item[1]}`);
      }}
      name={`jxl vs jpg comparison image ${i + 1}: ${item[0]}`}
    />
  ));

  return (
    <div>
      {support && (
        <section className="container px-2">
          <div>
            <div className="flex mt-2 mb-2">{sliderButtons}</div>
            <div className="relative">
              <ReactCompareImage
                leftImage={`/comparison/${image}.jxl`}
                rightImage={`/comparison/${image}.jpg`}
                leftImageAlt="jxl image"
                rightImageAlt="jpg image"
                sliderLineWidth={4}
                handle={
                  <div
                    role="button"
                    className="py-4 px-2 bg-blue-400 rounded-xl"
                    tabIndex={0}
                    id="handle"
                  />
                }
                sliderLineColor="rgba(255,255,255,0.2)"
                sliderPositionPercentage={0.5}
              />
              <p
                className="absolute top-4 left-4 py-2 px-3 rounded-md bg-bg-400"
                id="jxl"
              >
                {"jxl · " + imageSize + "kb"}
              </p>
              <p
                className="absolute top-4 right-4 py-2 px-3 rounded-md bg-bg-400"
                id="jpg"
              >
                {"jpg · " + imageSize + "kb"}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
