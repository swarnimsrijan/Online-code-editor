import { useContext } from "react"
import "./createPlaygroundModal.scss"
import { ModalContext } from "../ModalProvider"
import {v4} from "uuid"
import { PlaygroundContext, defaultCodes } from "../PlaygroundProvider"

export const CreateCardModal = () => {
    const {closeModal, modalPayload} = useContext(ModalContext);
    const {createPlayground} = useContext(PlaygroundContext);

    const onSubmitModal = (e) => {
        e.preventDefault();
        const fileName = e.target.filename.value; 
        const language = e.target.language.value;
        const file = {
            id: v4(),
            title: fileName,
            language,
            code: defaultCodes[language]
        }
        createPlayground(modalPayload, file);
        closeModal();
    }

    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
            <span onClick={closeModal} className="material-icons close">close</span>
            <h1>Create New Playground</h1>
            <div className= "item">
                <input name = "filename" placeholder="Enter Card Title" required/>
            </div>
            <div className= "item">
                <select name = "language" required>
                    <option value = "cpp">CPP</option>
                    <option value = "java">Java</option>
                    <option value = "javascript">Javascript</option>
                    <option value = "python">Python</option>
                </select>
                <button type = "submit">
                    Create Playground
                </button>
            </div>
        </form>
    </div>
}