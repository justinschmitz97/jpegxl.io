import React from 'react'

const DropAreaBackgroundStyle = {
    width: "36vw",
    height: "41vh",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "25px",
    margin: "70px 5vw 0 5vw",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
};

const DropAreaStyle = {
    textAlign: "center",
    width: "34vw",
    height: "36vh",
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
};

const DropLabelStyle = {
    color: "rgb(15, 38, 140)",
    fontWeight: "bolder",
    fontSize: 30,
    margin: "20px 0 0 0",
};

const FormatsLabelStyle = {
    color: "rgb(92, 91, 91)",
    fontSize: 16,
    margin: 0,
}

const ArrowButtonStyle = {
    width: "95px",
    height: "95px",
    borderRadius: "50%",
    background: "rgb(0,53,82)",
    background: "linear-gradient(145deg, rgba(0,53,82,1) 0%, rgba(0,123,191,1) 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}

const ArrowIconStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: 45,
}

const InputFileStyle = {
    display: "none",
}

export default function FileDropArea(props) {

    const preventDefaultDrop = (e) => {
        e.preventDefault();
    };

    const openFilesChoose = (e) => {
        e.preventDefault();
        document.getElementById("file-choose").click();
    };

    const filesDroped = (e) => {
        e.preventDefault();
        for (let i = 0; i < e.dataTransfer.files.length; i++)
        {
            const file = e.dataTransfer.files[i]; 
            loadFile(file);  
        }
    }

    const filesChoosed = (e) => {
        for (let i = 0; i < e.target.files.length; i++)
        {
            const file = e.target.files[i]; 
            loadFile(file);
        }
        e.target.value = "";
    };

    const loadFile = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let data = new Uint8Array(reader.result);
            props.handleFileLoaded(file.name, data);
        }
        reader.readAsArrayBuffer(file);
    }

    return (
        <div style={DropAreaBackgroundStyle} >
            <a role="button" style={DropAreaStyle} onClick={openFilesChoose} onDrop={filesDroped} onDragOver={preventDefaultDrop} onDragEnter={preventDefaultDrop} href="#"> 
                <div style={ArrowButtonStyle} >
                    <i className='fas fa-arrow-up' style={ArrowIconStyle} ></i>
                </div>
                <p style={DropLabelStyle} >Drop images or browse</p>
                <p style={FormatsLabelStyle} >supports png • jpg • webp • and more</p>
            </a>
            <input id="file-choose" type="file" style={InputFileStyle} onChange={filesChoosed} multiple autoComplete="off"/>
        </div>
    )
}