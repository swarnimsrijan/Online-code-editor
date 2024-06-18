import { useContext } from "react"
import {ModalContext, modalConstants } from "../../Providers/ModalProvider"
import {Modal} from "../../Providers/Modals/Modal"
import { RightComponent } from "./RightComponent"
import "./index.scss"
export const Homescreen = () =>{
    const modalFeatures = useContext(ModalContext);
    const openCreatePlaygroundModal = () => {
        modalFeatures.openModal(modalConstants.CREATE_PLAYGROUND);
    };
    return( 
    <div className="home-container">
        <div className="left-container">
            <div className="items-container">
            <img src="logo-small.png"></img>
            <h1>Code Deck</h1>
            <h2>Code.Compile.Debug</h2>
            <button onClick={openCreatePlaygroundModal}>
                <span className="material-icons">add</span>
                <span>Create Playground</span>
            </button>
            </div>
        </div>
        <RightComponent />
        <Modal />
    </div>
    )
}