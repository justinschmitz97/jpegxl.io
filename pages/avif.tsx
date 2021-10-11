import Conversion from "@components/Home/Conversion";
import DownloadButton from "@components/Home/DownloadButton";
import Dropzone from "@components/Home/Dropzone";
import Layout from "@components/Layout";
import Tooltip from "@components/Home/Tooltip";
import SettingsBox, { Settings } from "@components/Home/SettingsBox";
import Converter from "@utils/converter";
import { uniqueId } from "@utils/utils";
import { ReactElement, useEffect, useState } from "react";
import ReactCompareImage from "react-compare-image";
import TutorialBoxes from "@components/Home/TutorialBoxes";
import Advantages from "@components/Home/Advantages";

import cog from "@assets/settings.svg";

interface FileWithId {
  file: File;
  id: number;
}

function Glow() {
  return (
    <section className="hidden overflow-hidden px-3 mt-12 mb-4 max-w-screen-lg md:block">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 mx-auto w-3/5 rounded-full ease-in-out -z-1 bg-gradient blur-100"
        data-transition-style="glow"
      ></div>
    </section>
  );
}

function ImageSlider() {
  return (
    <section className="px-3 mx-auto max-w-screen-xl">
      <div className="relative">
        <ReactCompareImage
          leftImage={"/img/comparison.jpg"}
          rightImage={"/img/comparison.avif"}
          leftImageAlt="jpg image"
          rightImageAlt="avif image"
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
          id="jpg"
        >
          jpg · 18kB
        </p>
        <p
          className="absolute top-4 right-4 py-2 px-3 rounded-md bg-bg-400"
          id="avif"
        >
          avif · 18kB
        </p>
      </div>
    </section>
  );
}

export default function App(): ReactElement {
  const [converter, setConverter] = useState<Converter>();
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<File[]>([]);
  const [settingsBoxOpen, setSettingsBoxOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    effort: 25,
    quality: 75,
    useYuv444: false,
    keepTransparency: true,
    autoDownload: false,
  });

  useEffect(() => setConverter(new Converter()), []);

  function onSettingsUpdate(settings: Settings) {
    setSettings(settings);
  }

  async function onFilesSelected(selectedFiles: File[]) {
    setFiles([
      ...files,
      ...selectedFiles.map((file) => ({ file, id: uniqueId() })),
    ]);
    setSettingsBoxOpen(false);
  }

  function onConversionFinished(file: File) {
    convertedFiles.push(file);
    setConvertedFiles([...convertedFiles]);
  }

  const meta = {
    index: {
      title: "AVIF Converter - unlimited free conversions",
      description:
        "Fastest converter online. Supports bulk. Privacy protected. Convert all image types to AVIF for free.🚀 Compress your images now!⏱",
      url: "",
      image: "/logo_draft.png",
      datePublished: "01.09.20",
      dateModified: "30.05.21",
    },
  };

  return (
    <Layout meta={meta.index}>
      <section className="px-2 mt-12 text-center md:px-3">
        <h1>Convert all images to AVIF for free.</h1>
        <div className="block justify-center mb-6 md:flex">
          <h2 className="mt-0 mb-0 text-base font-normal">
            No data is sent. The magic happens in your browser.
          </h2>
          <Tooltip text="How?">
            We use Rav1e, Rust, and WASM to convert your images clientside.
          </Tooltip>
        </div>

        <div
          style={{ width: 720 }}
          data-transition-style="bouncingIn"
          className={
            "relative mx-auto flex flex-col items-center justify-center max-w-full rounded-xl p-0 md:p-4 bg-white bg-opacity-5" +
            (settingsBoxOpen ? " open" : "")
          }
        >
          <Dropzone onDrop={onFilesSelected} />

          <button
            aria-label="Conversion settings"
            className={`absolute top-4 right-4 z-50 block w-5 h-5 p-5 cursor-pointer transition-all transform ease-cog duration-300 bg-no-repeat bg-center invisible md:visible ${
              settingsBoxOpen ? " rotate-180" : "rotate-0"
            }`}
            style={{
              backgroundImage: `url(${cog})`,
              backgroundSize: 24,
              filter: `${
                settingsBoxOpen
                  ? "invert(15%) sepia(52%) saturate(6095%) hue-rotate(348deg) brightness(87%) contrast(88%)"
                  : "none"
              }`,
            }}
            onClick={() => setSettingsBoxOpen(!settingsBoxOpen)}
          ></button>
          <div
            className={
              "absolute top-0 left-full ml-4 w-24 h-auto p-4 bg-bg-400 rounded-md ease-out transform transition-all duration-500 origin-left" +
              (settingsBoxOpen
                ? " opacity-100 translate-x-0 scale-100"
                : " opacity-0 -translate-x-12 scale-0 ")
            }
          >
            <SettingsBox
              open={settingsBoxOpen}
              onSettingsUpdate={onSettingsUpdate}
            />
          </div>

          {converter &&
            files.map(({ file, id }) => (
              <Conversion
                onFinished={onConversionFinished}
                settings={settings}
                file={file}
                converter={converter}
                key={id}
              />
            ))}
          <DownloadButton files={convertedFiles} />
        </div>
      </section>
      <Glow />
      <Advantages />
      <ImageSlider />
      <TutorialBoxes />
      <div className="container px-2 my-12 max-w-screen-md text-left md:text-center">
        In the last ten years,{" "}
        <b>
          the size of an average web page has increased from 500 kb to 2000 kb
        </b>
        . Images always take up half the amount. A new image format is needed to
        stop the increasing size of images on the web. JPEG has been the most
        popular image format for years due to its high compatibility.
        <br /> <b>AVIF is the modern solution</b>. It was developed by the
        Alliance for Open Media, a collaboration of Google, Apple, Mozilla,
        Intel and other tech giants. AVIF is a codec for highly compressed
        images of acceptable quality and is constantly improving.{" "}
        <b>
          AVIF offers a significant reduction in file size compared to the
          current JPEG or WebP codecs
        </b>
        .<br /> You can reduce file sizes by 20-90%, even for images with
        transparency and animated frames. Currently supported by Chrome, Opera
        and Firefox, you can expect it to get more support soon.
        <br /> AVIF is being
        <b> developed by the most influential technology companies</b>. Netflix
        has already considered AVIF superior to JPEG and even newer WebP image
        formats in terms of image quality to compressed file size ratio. AV1 has
        been developed by industry leaders and technological innovators from all
        reputable companies. They licensed their codec patents royalty-free to
        create an ecosystem that would last. <br />{" "}
        <b>There is no other codec that seems as promising as AVIF</b>. With its
        widespread support, current feature rate, royalty-free usage and highest
        compression rate achieved, we are only a few steps away from creating a
        truly modern web. avif.io helps to strengthen the support of AVIF by
        providing information, news, resources and an image converter.
      </div>
    </Layout>
  );
}
