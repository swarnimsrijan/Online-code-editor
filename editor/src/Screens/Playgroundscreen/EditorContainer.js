import { useRef, useState, useContext } from "react";
import "./EditorContainer.scss";
import Editor from "@monaco-editor/react";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";
import { makeSubmission } from "./service";

const editorOptions = {
    fontSize: 18,
    wordWrap: 'on'
};

const fileExtensionMapping = {
    cpp: 'cpp',
    javascript: 'js',
    python: 'py',
    java: 'java'
};

export const EditorContainer = ({fileId, folderId, runCode}) => {
    const { getDefaultCode, getLanguageCode, updateLanguage, saveCode } = useContext(PlaygroundContext);
    const [code, setCode] = useState(() => getDefaultCode(fileId, folderId));
    const [language, setLanguage] = useState(() => getLanguageCode(fileId, folderId));
    const [theme, setTheme] = useState('vs-dark');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const codeRef = useRef(code);

    
    const onChangeCode = (newCode) => {
        codeRef.current = newCode;
    };

    const importCode = (event) => {
        const file = event.target.files[0];
        const fileType = file.type.includes("text");
        if (fileType) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = function(value){
                const importedCode = value.target.result;
                setCode(importedCode);
                codeRef.current = importedCode;
            };
        } else {
            alert("Please choose a text file containing code.");
        }
    };

    const exportCode = () => {
        const codeValue = codeRef.current?.trim();
        if (!codeValue) {
            alert("Please type some code into the editor before exporting.");
            return;
        }
        const codeBlob = new Blob([codeValue], { type: "text/plain" });
        const downloadUrl = URL.createObjectURL(codeBlob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `code.${fileExtensionMapping[language]}`;
        link.click();
    };

    const onChangeLanguage = (e) => {
        updateLanguage(fileId, folderId, e.target.value)
        setCode(getDefaultCode(fileId, folderId))
        setLanguage(e.target.value);
    };

    const onChangeTheme = (e) => {
        setTheme(e.target.value);
    };

    const onsaveCode = () => {
        saveCode(fileId, folderId, codeRef.current);
        alert("Code saved successfully")
    };

    const fullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const onRunCode = () => {
        runCode({code: codeRef.current, language })
    }

    return (
        <div className="root-editor-container" style ={isFullScreen ? styles.fullScreen : {}}>
            <div className="editor-header">
                <div className="editor-left-container">
                    <b className="title">{"Title of the Card"}</b>
                    <span className="material-icons">edit</span>
                    <button onClick={onsaveCode}>Save Code</button>
                </div>
                <div className="editor-right-container">
                    <select onChange={onChangeLanguage} value={language}>
                        <option value="cpp">cpp</option>
                        <option value="javascript">javascript</option>
                        <option value="java">java</option>
                        <option value="python">python</option>
                    </select>
                    <select onChange={onChangeTheme} value={theme}>
                        <option value="vs-dark">vs-dark</option>
                        <option value="vs-light">vs-light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
                <Editor
                    height="100%"
                    language={language}
                    options={editorOptions}
                    theme={theme}
                    onChange={onChangeCode}
                    value={code}
                />
            </div>
            <div className="editor-footer">
                <button className="btn" onClick={fullScreen}>
                    <span className="material-icons">fullscreen</span>
                    <span>{isFullScreen ? "Minimize": "Full Screen"}</span>
                </button>
                <label htmlFor="import-code" className="btn">
                    <span className="material-icons">cloud_upload</span>
                    <span>Import Code</span>
                </label>
                <input type="file" id="import-code" style={{ display: 'none' }} onChange={importCode} />
                <button className="btn" onClick={exportCode}>
                    <span className="material-icons">cloud_download</span>
                    <span>Export Code</span>
                </button>
                <button className="btn" onClick={onRunCode}>
                    <span className="material-icons">play_arrow</span>
                    <span>Run Code</span>
                </button>
            </div>
            
        </div>
    );
};


const styles = {
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10
    }
};
