import { Outlet } from "react-router-dom"
import DirectoryViewer from "../components/DirectoryViewer"
import NavigationPanel from "../components/NavigationPanel"
import Toolbar from "../components/Toolbar"


const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
        <Toolbar />

        <div className="flex h-full">
            <DirectoryViewer />

            <main className="w-10/12 flex flex-col">
                <NavigationPanel />

                  <Outlet />
            </main>
        </div>
    </div>
  )
}

export default MainLayout