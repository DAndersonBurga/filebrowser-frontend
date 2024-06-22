import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import HardDiskIcon from "../icons/files/HardDiskIcon"
import CustomModal from "../components/CustomModal";
import VirtualDiskForm from "../components/VirtualDiskForm";
import useGlobalContext from "../hooks/useGlobalContext";
import { getAllDisks } from "../helpers/disks";
import ContextMenu from "../components/ContextMenu";

const Index = () => {

  const { store } = useGlobalContext()
  const { disks, setDisks, pushToStackPath, setStackPath } = store

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 })
  const [open, setOpen] = useState(false)

  const [diskId, setDiskId] = useState("")

  const handleOpen = () => {
    setContextMenu({ visible: false, x: 0, y: 0 })
    setDiskId("")
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

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
      x: e.clientX - 225,
      y: e.clientY - 150
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
      className="h-full bg-slate-100 p-2 text-black relative"
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
        </ContextMenu>
      )}

      <div className="flex gap-2">
        { disks?.map(disk => (
          <Link
            key={disk.id}
            className="flex flex-col gap-2 hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out bg-slate-200 p-2 rounded-md text-blue-500"
            to={`/app/${disk.id}`}
            id={disk.id}
            onClick={() => pushToStackPath(disk.path)}
          >
            <HardDiskIcon
              className="size-14"
            />
            <span className="text-xl text-center leading-[0]">{disk.label}</span>
          </Link>
        ))}

        <button
          onClick={handleOpen}
          className="hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out bg-slate-200 p-2 rounded-md text-teal-500"
        >
          <HardDiskIcon
            className="size-14"
          />
          <span className="text-4xl text-center leading-[0] font-black">+</span>
        </button>
      </div>

      <CustomModal
        open={open}
        handleClose={handleClose}
      >
        <VirtualDiskForm 
          handleClose={handleClose}
        />
      </CustomModal>

    </section>
  )
}

export default Index