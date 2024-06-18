import { useContext } from "react"
import { PlaygroundContext } from "../../../Providers/PlaygroundProvider"
import "./index.scss";
import { ModalContext, modalConstants } from "../../../Providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folder = ({ folderTitle, cards, folderId }) => {
    const {deleteFolder, deleteFile} = useContext(PlaygroundContext);
    const {openModal, setModalPayload} = useContext(ModalContext);
    const navigate = useNavigate();

    const onDeleteFolder = () => {
        deleteFolder(folderId);
    };
    const onEditFolder = () => {
        setModalPayload(folderId);
        openModal(modalConstants.UPDATE_FOLDER_TITLE);
    };

    const opencreateCardModal = () => {
        setModalPayload(folderId)
        openModal(modalConstants.CREATE_CARD);
    };

    return (
        <div className="folder-container">
            <div className="folder-header">
                <div className="folder-header-item">
                    <span className="material-icons" style={{ color: "#ffca29" }}>folder</span>
                    <span>{folderTitle}</span>
                </div>
                <div className="folder-header-item">
                    <span className="material-icons" onClick={onDeleteFolder}>delete</span>
                    <span className="material-icons" onClick={onEditFolder}>edit</span>
                    <button onClick={opencreateCardModal}>
                        <span className="material-icons" >add</span>
                        <span>New Playground</span>
                    </button>
                </div>
            </div>
            <div className="cards-container">
                {
                    cards?.map((file, index) => {
                        const onEditFile = () => {
                            setModalPayload({fileId: file.id, folderId: folderId})
                            openModal(modalConstants.UPDATE_FILE_TITLE)
                        }
                        const ondeleteFile = () => {
                            deleteFile(folderId, file.id)
                        }
                        const navigateToPlaygroundScreen = () => {
                            navigate(`/playground/${file.id}/${folderId}`)
                        }
                        return (
                            <div className="card" key={index} onClick={navigateToPlaygroundScreen}>
                                <img src="logo-small.png" />
                                <div className="title-container">
                                    <span>{file?.title}</span>
                                    <span>Language: {file?.language}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <span className="material-icons" onClick={ondeleteFile}>delete</span>
                                    <span className="material-icons" onClick={onEditFile}>edit</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};
export const RightComponent = () => {
    const {folders} = useContext(PlaygroundContext);
    const modalFeatures = useContext(ModalContext);
    const openCreateNewFolderModal = () => {
        modalFeatures.openModal(modalConstants.CREATE_FOLDER);
    }

    return (
        <div className="rightcontainer">
            <div className="header">
                <div className="title"><span>My</span> Playground</div>
                <button className="add-folder" onClick={openCreateNewFolderModal}>
                     <span className="material-icons">add</span>
                    <span>New Folder</span>
                </button>
            </div>
            {
                folders?.map((folder, index) => {
                    return (<Folder folderTitle={folder?.title} cards={folder?.files} key={folder.id} folderId = {folder.id} />
                    )
                })
            }
        </div>
    );
};