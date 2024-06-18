import { Outlet } from "react-router-dom"
import DirectoryViewer from "../components/directoryViewer/DirectoryViewer"
import NavigationPanel from "../components/navigationPanel/NavigationPanel"
import Toolbar from "../components/toolbar/Toolbar"


const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
        <Toolbar />

        <div className="flex h-full">
            <DirectoryViewer />

            <main className="h-full w-10/12">
                <NavigationPanel />

                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default MainLayout