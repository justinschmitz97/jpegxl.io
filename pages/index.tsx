import Layout from "@components/Layout";
import Tooltip from "@components/Home/Tooltip";
import ReactCompareImage from "react-compare-image";
import Advantages from "@components/Home/Advantages";
import type { NextPage } from "next";
import { useState } from "react";
import DropArea from "../components/DropArea";
import FilesList from "../components/FilesList";
import JXLConverter from "../components/JXLConverter";
import { Options } from "../components/OptionsBox";

import cog from "@assets/settings.svg";

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
          jxl · 18kB
        </p>
      </div>
    </section>
  );
}

export interface FileInfo {
  name: string;
  buffer: any;
  converted: any;
}

const Home: NextPage = () => {
  let [files, setFiles] = useState<FileInfo[]>([]);
  const [options, setOptions] = useState<Options | null>(null);

  const fileConverted = (name: string, converted: any) => {
    setFiles((prev) => {
      const index = prev.findIndex((e) => {
        return e.name === name;
      });

      let result = [...prev];
      if (index !== -1) {
        result[index].buffer = null;
        result[index].converted = converted;
      }

      return result;
    });
  };

  const addFiles = (f: File[]) => {
    for (let i = 0; i < f.length; i++) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let data = new Uint8Array(reader.result as ArrayBuffer);
        setFiles((prev) => {
          let index = prev.findIndex((e) => {
            return e.name === f[i].name;
          });

          if (index !== -1) {
            let result = [...prev];
            result[index].converted = null;
            result[index].buffer = data;
            return result;
          } else {
            return [
              ...prev,
              { name: f[i].name, buffer: data, converted: null },
            ];
          }
        });
      };
      reader.readAsArrayBuffer(f[i]);
    }
  };

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
        <h1>Convert all images to JXL for free.</h1>
        <div className="block justify-center mb-6 md:flex">
          <h2 className="mt-0 mb-0 text-base font-normal">
            No data is sent. The magic happens in your browser.
          </h2>
          <Tooltip text="How?">
            We use C Libraries and WASM to convert your images clientside.
          </Tooltip>
        </div>

        <div className="app">
          <div className="boxContainer">
            <DropArea
              onDrop={addFiles.bind(this)}
              onOptionsChanged={(options: Options) => setOptions(options)}
            />
            <JXLConverter
              options={options}
              files={files}
              onFileConverted={fileConverted.bind(this)}
            />
            <FilesList files={files} />
          </div>
        </div>
      </section>
      <Glow />
      <Advantages />
      <ImageSlider />
    </Layout>
  );
};

export default Home;
