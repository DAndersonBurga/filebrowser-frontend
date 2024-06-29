import { useEffect, useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import SearchIcon from "../icons/search/SearchIcon";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFilesFromDisk } from "../helpers/disks";
import { findWithPath, getFilesFromDirectory } from "../helpers/files";
import { toast } from "react-toastify";
import { getQuickAccess } from "../helpers/quickAccess";

const NavigationPanel = () => {

  const { store } = useGlobalContext();
  const { stackPath, peekFromStackPath, pushToStackPath, setFiles, clientWs } = store;
  const navigate = useNavigate();
  const location = useLocation();

  const { diskId, directoryId } = useParams();

  const [directoryPath, setDirectoryPath] = useState("");

  useEffect(() => {
    setDirectoryPath(peekFromStackPath());
  }, [stackPath])

  const handleChangeSearch = async (e) => {
    e.preventDefault();
    const query = e.target.value;    

    if(query === "") {

      if(location.pathname === "/app/quickAccess") {
        const { data } = await getQuickAccess();
        setFiles(data);
        return;
      }

      if(!directoryId) {
        const response = await getFilesFromDisk(diskId);
        setFiles(response.data);
      } else {
        const response = await getFilesFromDirectory(diskId, directoryId);
        setFiles(response.data);
      }
      
      return;
    } else {
      
      if(location.pathname !== "/app/quickAccess") {
        const payload = {
          diskId,
          parentId: directoryId ? directoryId : diskId,
          query
        }
  
        clientWs.send("/app/search", {}, JSON.stringify(payload));
      } else {
        const payload = {query}

        clientWs.send("/app/search/quickAccess", {}, JSON.stringify(payload));

      }

    }
  }

  const handleChangePath = (e) => {
    setDirectoryPath(e.target.value);
  }

  const handleSubmitPath = async (e) => {
    e.preventDefault();

    try {
      const { data } = await findWithPath(directoryPath);
      pushToStackPath(directoryPath);
      
      if(!data.directoryId) {
        navigate(`/app/${data.diskId}`);
        return;
      }

      navigate(`/app/${data.diskId}/${data.directoryId}`);

    } catch (error) {
      toast.error("La ruta no existe");
    }

  }

  return (
    <nav className="w-full gap-2 h-12 bg-gray-800 flex items-center text-white px-2">
        <form className="w-full" onSubmit={handleSubmitPath}>
          <input
            className="w-full p-1 rounded-md bg-transparent border border-white/60"
            name="path"
            type="text"
            value={directoryPath}
            onChange={handleChangePath}
          />
        </form>

        <form className="w-56" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <input
              className="w-full p-1 rounded-md bg-transparent border border-white/60" 
              type="search"
              placeholder="Buscar archivos"
              onChange={handleChangeSearch}
            />

            <SearchIcon className="h-5 w-5 absolute right-1.5 top-1.5" />
          </div>
        </form>
    </nav>
  )
}

export default NavigationPanel