import { useMemo, useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import SearchIcon from "../icons/search/SearchIcon";
import { useParams } from "react-router-dom";
import { getFilesFromDisk } from "../helpers/disks";
import { getFilesFromDirectory } from "../helpers/files";

const NavigationPanel = () => {

  const { store } = useGlobalContext();
  const { stackPath, peekFromStackPath, setFiles, clientWs } = store;

  const { diskId, directoryId } = useParams();

  const path = useMemo(() => peekFromStackPath(), [stackPath])

  const handleChangeSearch = async (e) => {
    e.preventDefault();
    const query = e.target.value;    

    if(query === "") {
      if(!directoryId) {
        const response = await getFilesFromDisk(diskId);
        setFiles(response.data);
      } else {
        const response = await getFilesFromDirectory(diskId, directoryId);
        setFiles(response.data);
      }
      
      return;
    } else {
      const payload = {
        diskId,
        parentId: directoryId ? directoryId : diskId,
        query
      }

      clientWs.send("/app/search", {}, JSON.stringify(payload));
    }
  }

  const handleChangePath = (e) => {
    console.log(e.target.value);
  }


  return (
    <nav className="w-full gap-2 h-12 bg-gray-800 flex items-center text-white px-2">
        <form className="w-full">
          <input
            className="w-full p-1 rounded-md bg-transparent border border-white/60" 
            type="text"
            value={path}
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