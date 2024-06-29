import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./layout/MainLayout"
import VirtualDisksPage from "./pages/VirtualDisksPage"
import { GlobalContextProvider } from "./context/GlobalContext";
import DirectoryContentPage from "./pages/DirectoryContentPage";
import QuickAccessPage from "./pages/QuickAccessPage";
import Index from "./pages/Index";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<MainLayout />}>
              <Route index element={<VirtualDisksPage />} />
              <Route path="/app/quickAccess" element={<QuickAccessPage />}/>

              <Route path=":diskId">
                <Route index element={<DirectoryContentPage />} />
                <Route path=":directoryId" element={<DirectoryContentPage />} />
              </Route>
            </Route>
          </Route>

        </Routes>

        <ToastContainer />
      </GlobalContextProvider>
    </BrowserRouter>
  )
}

export default App
