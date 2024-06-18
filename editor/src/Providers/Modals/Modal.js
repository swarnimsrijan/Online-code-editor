import { useContext } from "react";
import { ModalContext, modalConstants } from "../ModalProvider";
import { CreatePlaygroundModal } from "./CreatePlaygroundModal";
import { CreateFolderModals } from "./CreateFolderModals"
import { UpdateFolderTitleModal } from "./UpdateFolderTitleModal"
import { UpdateFileTitleModal } from "./UpdateFileTitleModal";
import { CreateCardModal } from "./CreateCardModal";
export const Modal = () => {
    const modalFeatures = useContext(ModalContext);
    
    return (
        <>
            {modalFeatures.activeModal === modalConstants.CREATE_PLAYGROUND && <CreatePlaygroundModal />}
            {modalFeatures.activeModal === modalConstants.CREATE_FOLDER && <CreateFolderModals />}
            {modalFeatures.activeModal === modalConstants.UPDATE_FOLDER_TITLE && <UpdateFolderTitleModal />}
            {modalFeatures.activeModal === modalConstants.UPDATE_FILE_TITLE && <UpdateFileTitleModal />}
            {modalFeatures.activeModal === modalConstants.CREATE_CARD && <CreateCardModal />}
        </>
    );
};
