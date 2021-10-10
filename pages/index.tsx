import type { NextPage } from "next";
import { useState } from "react";
import DropArea from "../components/DropArea";
import Head from "next/head";
import FilesList from "../components/FilesList";
import JXLConverter from "../components/JXLConverter";
import { Options } from "../components/OptionsBox";

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

  return (
    <>
      <div className="app">
        <Head>
          <title>JXL Converter</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
        </Head>
        <header className="header">
          <h1 className="topInfoLabel">Convert images to JXL</h1>
          <h5 className="infoLabel">
            No data is sent. The magic happens in your browser
          </h5>
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
        </header>
      </div>
      <div className="gradient"></div>
    </>
  );
};

export default Home;
