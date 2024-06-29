import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import HardDiskIcon from "../icons/files/HardDiskIcon"
import CustomModal from "../components/CustomModal";
import VirtualDiskForm from "../components/VirtualDiskForm";
import useGlobalContext from "../hooks/useGlobalContext";
import { getAllDisks } from "../helpers/disks";
import ContextMenu from "../components/ContextMenu";
import FileProperties from "../components/FileProperties";
import useFileHandler from "../hooks/useFileHandler";

const VirtualDisksPage = () => {

  const { store } = useGlobalContext()
  const { disks, setDisks, pushToStackPath, setStackPath, contextMenu, setContextMenu, 
    openModal, modalIsOpen, closeModal, propertiesFileModalIsOpen, setPropertiesFileModalIsOpen } = store

  const [diskId, setDiskId] = useState("")

  const { handleClickShowPropertiesAction } = useFileHandler()

  const handleOpen = () => {
    setDiskId("")
    openModal()
  }

  const handleOnAuxClick = (e) => {
    e.preventDefault()
  
    if(e.target.tagName === "svg" || e.target.tagName === "SPAN") {
      setDiskId(e.target.parentNode.id)
    } else if(e.target.tagName === "path") {
      setDiskId(e.target.parentNode.parentNode.id)
    } else if(e.target.tagName === "A"){
      setDiskId(e.target.id)
    } else {
      setDiskId("")
    }

    setContextMenu({
      visible: !contextMenu?.visible,
      x: e.clientX,
      y: e.clientY
    })

  }

  const handleOnAuxClickButton = (e) => {
    e.preventDefault()
    setDiskId(e.target.id)

    setContextMenu({
      visible: !contextMenu?.visible,
      x: e.clientX,
      y: e.clientY
    })
  }

  useEffect(() => {
    setStackPath([])

    const fetchData = async () => {
      const { data } = await getAllDisks()
      setDisks(data)
    }

    fetchData()
  }, [])

  return (
    <section 
      className="h-full bg-slate-100 p-2 text-black overflow-y-auto"
      onContextMenu={(e) => e.preventDefault()}
      onAuxClick={handleOnAuxClick}
      onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
    >

      <h1 className="text-3xl font-semibold mb-5 text-gray-700">Dispositivos y unidades</h1>
      { contextMenu?.visible && ( 
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y}
          handleOpen={handleOpen}
        >
          <button 
            className="btn-context flex gap-1 items-center"
            onClick={handleOpen}
          >
            <HardDiskIcon className="h-5 w-5" />
            Nuevo
          </button>

          <button className={"btn-context"} disabled={diskId === ""}>Eliminar</button>
          <button 
            onClick={handleClickShowPropertiesAction}
            className={"btn-context"} disabled={diskId === ""}
          >
            Propiedades
          </button>
          <button className={"btn-context"} disabled={diskId === ""}>Editar</button>
        </ContextMenu>
      )}

      <div className="flex gap-2">
        { disks?.map(disk => (
          <Link
            onAuxClick={handleOnAuxClickButton}
            key={disk.id}
            className="flex flex-col relative gap-2 hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out bg-slate-200 p-2 rounded-md text-blue-500 h-[5.5rem]"
            to={`/app/${disk.id}`}
            id={disk.id}
            onClick={() => pushToStackPath(disk.path)}
            style={{ pointerEvents: "auto" }}
          >
            <HardDiskIcon
              className="size-14 pointer-events-none"
            />
            <span className="pointer-events-none text-xl text-center leading-[0] font-bold">{disk.label}</span>
          </Link>
        ))}

        <button
          onClick={handleOpen}
          className="hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out bg-slate-200 p-2 rounded-md text-teal-500 flex flex-col gap-1 items-center h-[5.5rem]" 
        >
          <HardDiskIcon
            className="size-14"
          />
          <span className="text-4xl text-center leading-[0] font-black">+</span>
        </button>
      </div>

      <CustomModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      >
        <VirtualDiskForm />
      </CustomModal>

      <CustomModal
        modalIsOpen={propertiesFileModalIsOpen}
        closeModal={() => setPropertiesFileModalIsOpen(false)}
      >
        <FileProperties 
          disk={disks?.find(disk => disk.id === diskId)}
        />
      </CustomModal>
    </section>
  )
}

export default VirtualDisksPage