import React, {useEffect, useState} from 'react';

import FileDropArea from './FileDropArea';
import JXLConverter from './JXLConverter';
import FilesList from './FilesList';
import { Scrollbars } from "react-custom-scrollbars";

import * as AppStyle from "./AppStyle.js"


const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "rgba(255, 255, 255, 0.3)"
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
  
const CustomScrollbars = (props) => (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
);

export default function App() {

    let jxlConvert = null;
    const setJxlConvert = (converter) => {
        jxlConvert = converter;
    };

    let addFileToList = null;
    const setAddFile = (addFile) => {
        addFileToList = addFile;
    };

    const fileLoaded = (name, data) => {
        if (addFileToList)
            addFileToList(name, data);
    };

    const convertFileToJxl = (buffer, index) => {
        return jxlConvert(buffer);
    };

    const [progressive, setProgressive] = useState(false);
    const [quality, setQuality] = useState(0);
    const [effort, setEffort] = useState(1);
    const [epf, setEpf] = useState('1');
    const [resampling, setResampling] = useState('1');
    const [bitdepth, setBitdepth] = useState(0);
    const [colorspace, setColorspace] = useState('0');
    const [colortransform, setColortransform] = useState('0');

    const [options, setOptions] = useState({});

    useEffect(() => {
        setOptions(
            {
                progressive: progressive,
                quality: quality,
                effort: effort,
                epf: epf,
                resampling: resampling,
                bitdepth: bitdepth,
                colorspace: colorspace,
                colortransform: colortransform,
            }
        );
    }, [progressive, quality, effort, epf, resampling, bitdepth, colorspace, colortransform]);

    return (
        <div className="App" style={AppStyle.TopElementStyle} >
            <header className="App-header" style={AppStyle.AppHeaderStyle} >
                <h3 style={AppStyle.TopLabelStyle} >Convert images to JXL</h3>
                <h5 style={AppStyle.LabelStyle} >No data is sent. The magic happens in your browser</h5>
                <div style={AppStyle.BoxesContainerStyle} >
                    <div style={AppStyle.OptionsStyle}>
                        <CustomScrollbars>
                            <h4 style={{...AppStyle.TopLabelStyle, padding: "10px",}} >Conversion settings</h4>
                            <div style={{ textAlign: "left", margin: "10 0 0 30" }}>
                                <input checked={progressive} onChange={(e)=> {setProgressive(e.target.checked)}} 
                                    style={{ background: "rbg(0, 212, 255)", margin: "0 10 0 0", position: "relative", verticalAlign: "center", width: "1.2rem", height: "1.2rem"}} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                <label style={{ fontSize: "1.2rem"}} className="form-check-label" htmlFor="flexCheckDefault">
                                    Progressive
                                </label>
                            </div>
                            <div style={{ textAlign: "left", margin: "10 0 0 0" }}>
                                <label style={{ margin: "0 10 0 30", fontSize: "1.2rem" }} htmlFor="quality">Quality</label>
                                <input value={quality} onChange={(e) => {setQuality(e.target.value)}} style={{ padding: "10 0 0 0", width: 150 }} type="range" className="custom-range" min="0" max="100" step="1" id="quality"/>
                            </div>
                            <div style={{ textAlign: "left", margin: "10 0 0 0" }}>
                                <label style={{ margin: "0 10 0 30", fontSize: "1.2rem" }} htmlFor="effort">Effort</label>
                                <input value={effort} onChange={(e) => {setEffort(e.target.value)}} style={{ padding: "10 0 0 0", width: 150 }} type="range" className="custom-range" min="1" max="9" step="1" id="effort"/>
                            </div>
                            <div style={{ textAlign: "left", margin: "10 0 0 30" }}>
                                <select value={epf} onChange={(e) => {setEpf(e.target.value)}} id="epf" style={{ margin: "0 10 0 0", fontSize: "1.2rem" }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option value="1" defaultValue>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <label style={{ fontSize: "1.2rem"}} className="form-check-label" htmlFor="epf">
                                    Epf
                                </label>
                            </div>
                            <div style={{ textAlign: "left", margin: "10 0 0 30" }}>
                                <select value={resampling} onChange={(e) => {setResampling(e.target.value)}} id="resampling" style={{ margin: "0 10 0 0", fontSize: "1.2rem" }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option value="1" defaultValue>1</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                </select>
                                <label style={{ fontSize: "1.2rem"}} className="form-check-label" htmlFor="resampling">
                                    Resampling
                                </label>
                            </div>
                            <div style={{ textAlign: "left", margin: "10 0 0 0" }}>
                                <label style={{ margin: "0 10 0 30", fontSize: "1.2rem" }} htmlFor="override_bitdepth">Override bitdepth</label>
                                <input value={bitdepth} onChange={(e) => {setBitdepth(e.target.value)}} style={{ padding: "10 0 0 0", width: 150 }} type="range" className="custom-range" min="0" max="32" step="1" id="override_bitdepth"/>
                            </div>
                            <div style={{ textAlign: "left", margin: "10 0 0 30" }}>
                                <select value={colorspace} onChange={(e) => {setColorspace(e.target.value)}} id="colorspace" style={{ margin: "0 10 0 0", fontSize: "1.2rem" }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option value="0" defaultValue>RGB</option>
                                    <option value="1">YCoCg</option>
                                </select>
                                <label style={{ fontSize: "1.2rem"}} className="form-check-label" htmlFor="colorspace">
                                    Colorspace
                                </label>
                            </div>
                            <div style={{ textAlign: "left", margin: "10 0 0 30" }}>
                                <select value={colortransform} onChange={(e) => {setColortransform(e.target.value)}} id="colortransform" style={{ margin: "0 10 0 0", fontSize: "1.2rem" }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option value="0" defaultValue>XYB</option>
                                    <option value="1">None</option>
                                    <option value="2">YCbCr</option>
                                </select>
                                <label style={{ fontSize: "1.2rem"}} className="form-check-label" htmlFor="colortransform">
                                    Colortransform
                                </label>
                            </div>
                        </CustomScrollbars>
                    </div>
                    <FileDropArea handleFileLoaded={fileLoaded} />
                    <JXLConverter options={options} setFileConverter={setJxlConvert} />
                    <FilesList setAddItem={setAddFile} convertFileToJXL={convertFileToJxl} />
                </div>
            </header>
        </div>
    )
}