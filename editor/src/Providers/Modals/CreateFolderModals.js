import { useContext } from "react";
import "./createPlaygroundModal.scss"
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

export const CreateFolderModals = () => {
    const modalFeatures = useContext(ModalContext);
    const {createNewFolder} = useContext(PlaygroundContext);
    const closeModal = () => {
        modalFeatures.closeModal();
    };

    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        createNewFolder(folderName);
        closeModal();
    };

    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
            <span onClick = {closeModal} className= "material-icons close">close</span>
            <h1>Create New Folder</h1>
            <div style = {createFolderStyles.inputContainer}>
                <input name = "folderName" style = {createFolderStyles.input} placeholder="Enter Folder Name"/>
                <button style = {createFolderStyles.btn} type = 'submit'>Create Folder</button>
            </div>
        </form>
    </div>
}

export const createFolderStyles = {
    inputContainer: {
        display: 'flex',
        gap: 10
    },
    input: {
        flexGroup: 1,
        padding: 10
    },
    btn: {
        backgroundColor: '#241F21',
        border: 'none',
        borderRadius: 4,
        padding: '0px 10px',
        color: 'white'
    }
}