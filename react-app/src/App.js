import React from 'react';

import FileDropArea from './FileDropArea';
import JXLConverter from './JXLConverter';
import FilesList from './FilesList';

import * as AppStyle from "./AppStyle.js"

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

    return (
        <div className="App" style={AppStyle.TopElementStyle} >
            <header className="App-header" style={AppStyle.AppHeaderStyle} >
                <h3 style={AppStyle.TopLabelStyle} >Convert images to JXL</h3>
                <h5 style={AppStyle.LabelStyle} >No data is sent. The magic happens in your browser</h5>
                <div style={AppStyle.BoxesContainerStyle} >
                    <div style={AppStyle.OptionsStyle}>

                    </div>
                    <FileDropArea handleFileLoaded={fileLoaded} />
                    <JXLConverter setFileConverter={setJxlConvert} />
                    <FilesList setAddItem={setAddFile} convertFileToJXL={convertFileToJxl} />
                </div>
            </header>
        </div>
    )
}