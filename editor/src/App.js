import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homescreen } from "./Screens/HomeScreen";
import { Playgroundscreen } from "./Screens/Playgroundscreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider";
import { ModalProvider } from "./Providers/ModalProvider";


function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/playground/:fileId/:folderId" element={<Playgroundscreen />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
