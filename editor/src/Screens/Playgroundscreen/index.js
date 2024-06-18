import { useParams } from "react-router-dom";
import "./index.scss"
import { EditorContainer } from "./EditorContainer";
import { useCallback, useState } from "react";
import { makeSubmission } from "./service";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const Playgroundscreen = () => {
    const params = useParams();
    const { fileId, folderId } = params;
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [showloader, setShowloader] = useState(false);

    
    const importInput = (event) => {
        const file = event.target.files[0];
        const fileType = file.type.includes("text")
        if(fileType) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (event) => {
                setInput(event.target.result)
            }
        }
        else{
            alert("Please Choose a Program File")
        }

    }

    const exportOutput = () => {
        const outputValue = output.trim();
        if(!outputValue){
            alert("Output is Empty");
            return;
        }
        const blob = new Blob([outputValue], {type: "text/plain"})
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `output.txt`;
        link.click();
    }
    
    const callback = ({apiStatus, data, message}) => {
        if(apiStatus === 'loading'){
            setShowloader(true);
        }
        else if(apiStatus === 'error'){
            setShowloader(false);
            setOutput("Something went wrong")
        }
        else{
            setShowloader(false);
            if(data.status.id === 3){
                setOutput(atob(data.stdOut))
            }
            else{
                setOutput(atob(data.stderr))
            }
        }
    }

    const runCode = useCallback(({code, language}) => {
        makeSubmission({code, language, stdin: input, callback})
    }, [input])
    
    return (<div className="playgroound-container">
        <div className="header-container">
            <img src="/logo-small (1).png" className="logo" />
        </div>
        <div className="content-container">
            <div className="editor-container">
                <EditorContainer fileId = {fileId} folderId = {folderId} runCode = {runCode}/>
            </div>
            <div className="input-container">
                <div className="input-header">
                <b>Input:</b>
                <label htmlFor="input" className="icon-container">
                    <span className="material-icons ">cloud_download</span>
                    <b className="">Import Inputs</b>
                </label>
                <input type = "file" id = "input" style = {{display: 'none'}} onChange={importInput}/>
                </div>
                <textarea value = {input} onChange = {(e) => setInput(e.target.value)}></textarea>
            </div>
            <div className="input-container">
                <div className="input-header">
                    <b>Output:</b>
                    <button className="icon-container" onClick={exportOutput}>
                        <span className="material-icons">cloud_upload</span>
                        <b>Export Output</b>
                    </button>
                </div>
                <textarea readOnly value = {output} onChange={(e) => setOutput(e.target.value)}></textarea>
            </div>
        </div>

        {showloader && <div className = "fullpage-loader">
                <div className="loader">

                </div>
            </div>}
    </div>
    );
};