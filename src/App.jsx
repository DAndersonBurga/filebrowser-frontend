import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./layout/MainLayout"
import Index from "./pages/Index"
import { GlobalContextProvider } from "./context/GlobalContext";
import DirectoryContent from "./components/DirectoryContent";

function App() {

  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<div>Pagina para crear un sistema de archivos</div>} />
          
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Index />} />

            <Route path=":diskId">
              <Route index element={<DirectoryContent />} />
              <Route path=":directoryId" element={<DirectoryContent />} />
            </Route>
          </Route>

        </Routes>

        <ToastContainer />
      </GlobalContextProvider>
    </BrowserRouter>
  )
}

export default App
