import React, {useEffect, useState} from 'react'

import { Scrollbars } from "react-custom-scrollbars";

const BoxContainerStyle = {
    width: "20vw",
    height: "36vh",
    margin: "calc(70px + 2.5vh) 0 0 0",
    overflow: "hidden",
};

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

export default function FilesList(props) {

    const downloadFile = (file) => {
        if (file.isConverted) {
            var saveByteArray = (function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (data, name) {
                    var blob = new Blob(data, {type: "octet/stream"}),
                    url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = name;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }());
            
            saveByteArray([file.converted], file.name.split('.').slice(0, -1).join('.') + '.jxl');
        }
    };

    const createItem = (file, index) => {
        const backStyle = {background: "linear-gradient(90deg, rgba(198,240,255,0.06) 0%, rgba(255,255,255,0) 50%)"};

        const downloadStyle = file.isConverted ? 
        {backgroundColor: "rgba(0, 130, 219, 1)", cursor: "pointer"} :
        {backgroundColor: "rgba(139, 139, 139, 0.25)", cursor: "default"};

        const loadStyle = file.isConverted ? 
        { visibility: "hidden" } :
        { visibility: "show" };

        return (
        <div key={index} style={{ borderRadius: 15, margin: 10, display: "flex", flexDirection: "row", alignItems: "center", ...backStyle }} >
            <div className="spinner-grow" role="status" style={{ ...loadStyle, padding: 15, margin: "0 10 0 10", color: "rgba(255, 255, 255, 0.4)" }}>
                <span className="sr-only">Loading...</span>
            </div>
            <p style={{ textAlign: "left", width: "100%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: 20, padding: 5, margin: 0 }} >
                {file.name}
            </p>
            <button onClick={() => downloadFile(file)} style= {{ margin: 0, border: "none", outline: "none", color: "white", margin: "0 0 0 10", padding: 20, fontSize: "20px", ...downloadStyle }}>
                <i className="fa fa-download"></i>
            </button>
        </div>);
    };

    const [files, setFiles] = useState([]);

    useEffect( () => {
        for (let i = 0; i < files.length; i++){
            if (files[i].converted === null){
                files[i].converted = props.convertFileToJXL(files[i].buffer, i);
            }
        }
    }, [files]);

    const addFileToList = (name, buffer) => {
        setFiles( (prevState) => {
            let arr = [...prevState];
            console.log("add to list");
            arr.push({name: name, buffer: buffer, converted: null, isConverted: true});
            return arr;
        });
    };

    useEffect(() => {
        props.setAddItem(addFileToList.bind(this));
    });

    return (
        <div style={BoxContainerStyle}>
            <CustomScrollbars>
                { files.map((e, index) => {return createItem(e, index)}) }
            </CustomScrollbars>
        </div>  
    );
}