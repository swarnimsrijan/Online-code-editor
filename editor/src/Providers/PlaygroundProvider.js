import { children, createContext, useContext, useState, useEffect} from "react"
import { json } from "react-router-dom";
import {v4} from 'uuid';
export const PlaygroundContext = createContext();


const initialData = [
    {
        id: v4(),
        title: 'DSA',
        files:[
            {
                id: v4(),
                title: 'index',
                code: `cout<<"Hello World!";`,
                language: 'cpp'
            }
        ]
    },
    {
        
        id: v4(),
        title: 'Frontend',
        files:[
            {
                id: v4(),
                title: 'test',
                code: `console.log("Hello World!")`,
                language: 'javascript'
            }
        ]
    }
];
export const defaultCodes = {
    'cpp': `
    #include <iostream>
    int main()
    {
        std::cout<<"Hello World";
        return 0;
    }`,
    'javascript': `console.log("Hello world!")`,
    'python': `print("Hello World!")`,
    'java': `
    public class Main
    {
        public static void main(String[] args) {
            System.out.println("Hello World");
        }
    }`
};

export const PlaygroundProvider = ({children}) => {
    const [folders, setFolders] = useState(() =>{
        const localData = localStorage.getItem('data');
        try {
            return JSON.parse(localData);
        } catch (error) {
            console.error("Failed to parse local storage data:", error);
            return initialData;
        }
    });
    const createNewPlayground = (newPlayground) => {
        const {filename, foldername, language} = newPlayground;
        const newFolders = [...folders];
        newFolders.push({
            id: v4(),
            title: foldername,
            files: [
                {
                    id: v4(),
                    title: filename,
                    code: defaultCodes[language],
                    language
                }
            ]
        })
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }

    const createNewFolder = (folderName) =>{
        const newFolder = {
            id: v4(),
            title: folderName,
            files: []
        }
        const allFolders = [...folders, newFolder]

        localStorage.setItem('data', JSON.stringify(allFolders));
        setFolders(allFolders);
    }

    const deleteFolder = (id) => {
        const updatedFolderItems = folders.filter((folderItem) =>{
            return folderItem.id !== id;
        })
        localStorage.setItem('data', JSON.stringify(updatedFolderItems) );
        setFolders(updatedFolderItems)

    };

    const editFolderTitle = (newFolderName, id) => {
        const updatedFoldersList = folders.map((folderItem) =>{
            if(folderItem.id === id){
                folderItem.title = newFolderName;
            }
            return folderItem
        })
        localStorage.setItem('data', JSON.stringify(updatedFoldersList))
        setFolders(updatedFoldersList)
    }
    
    const editFileTitle = (newFileName, folderId, fileId) => {
        const copiedFolders = [...folders];
        for (let i = 0; i < copiedFolders.length; i++) {
            if (folderId === copiedFolders[i].id) {
                const files = copiedFolders[i].files;
                for (let j = 0; j < files.length; j++) {
                    if (files[j].id === fileId) {
                        files[j].title = newFileName;
                        break;
                    }
                }
                break;
            }
        }

        localStorage.setItem('data', JSON.stringify(copiedFolders));
        setFolders(copiedFolders);
    }

    const deleteFile = (folderId, fileId) => {
        const copiedFolders = [...folders];
        for(let i = 0; i < copiedFolders.length; i++){
            if(copiedFolders[i].id === folderId){
                const files = [...copiedFolders[i].files];
                copiedFolders[i].files = files.filter((file) => {
                    return file.id !== fileId;
                })
                break;
            }
        }

        localStorage.setItem('data', JSON.stringify(copiedFolders));
        setFolders(copiedFolders);
    }
    
    const createPlayground = (folderId, file) => {
        const copiedFolders = [...folders]
        for(let i = 0; i < copiedFolders.length; i++){
            if(copiedFolders[i].id === folderId){
                copiedFolders[i].files.push(file);
                break;
            }
        }

        localStorage.setItem('data', JSON.stringify(copiedFolders));
        setFolders(copiedFolders)
    }

    const updateLanguage = (fileId, folderId, language) =>{
        const newFolders = [...folders]
        for(let i = 0; i < newFolders.length; i++){
            if(newFolders[i].id === folderId){
                for(let j = 0; j < newFolders[i].files.length; j++){
                    const currentFile = newFolders[i].files[j];
                    if(fileId === currentFile.id){
                        newFolders[i].files[j].code = defaultCodes[language]
                        newFolders[i].files[j].language = language
                    }
                }
            }
        }
    }
    const getDefaultCode = (fileId, folderId) => {
        for(let i = 0; i < folders.length; i++){
            if(folders[i].id === folderId){
                for(let j = 0; j < folders[i].files.length; j++){
                    const currentFile = folders[i].files[j];
                    if(fileId === currentFile.id){
                        return currentFile.code;
                    }
                }
            }
        }

    }

    const getLanguageCode = (fileId, folderId) => {
        for(let i = 0; i < folders.length; i++){
            if(folders[i].id === folderId){
                for(let j = 0; j < folders[i].files.length; j++){
                    const currentFile = folders[i].files[j];
                    if(fileId === currentFile.id){
                        return currentFile.language;
                    }
                }
            }
        }

    }

    const saveCode = (fileId, folderId, newCode) => {
        const newFolders = [...folders]
        for(let i = 0; i < newFolders.length; i++){
            if(newFolders[i].id === folderId){
                for(let j = 0; j < newFolders[i].files.length; j++){
                    const currentFile = newFolders[i].files[j];
                    if(fileId === currentFile.id){
                        newFolders[i].files[j].code = newCode;
                    }
                }
            }
        }
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }

    useEffect(() => {
        if(!localStorage.getItem('data')){
            localStorage.setItem('data', JSON.stringify(folders));
        }
    }, [])

    const playgroundFeatures = {
        folders,
        createNewPlayground,
        createNewFolder,
        deleteFolder,
        editFolderTitle,
        editFileTitle,
        deleteFile,
        createPlayground,
        getDefaultCode,
        getLanguageCode,
        updateLanguage,
        saveCode
    }
    return (
        <PlaygroundContext.Provider value = {playgroundFeatures}>
            {children}
        </PlaygroundContext.Provider> 
    )
}