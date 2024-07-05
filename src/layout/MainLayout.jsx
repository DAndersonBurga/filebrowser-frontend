import { Outlet } from "react-router-dom"
import Toolbar from "../components/toolbar/Toolbar"
import DirectoryTreeView from "../components/directory/DirectoryTreeView"
import NavigationPanel from "../components/navigation/NavigationPanel"


const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
        <Toolbar />

        <div className="flex h-full">
            <DirectoryTreeView />

            <main className="w-10/12 flex flex-col">
                <NavigationPanel />

                  <Outlet />
            </main>
        </div>
    </div>
  )
}

export default MainLayout