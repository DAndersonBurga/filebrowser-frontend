import { useEffect } from "react"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { FILE_TYPE } from "../constants/file"
import { createDirectory, createTxtFile, getFilesFromDirectory } from "../helpers/files"
import { getFilesFromDisk } from "../helpers/disks"
import useGlobalContext from "../hooks/useGlobalContext"

const FileForm = ({ handleClose }) => {

  const { store } = useGlobalContext()
  const { setFiles } = store

  const { diskId, directoryId } = useParams()
  const { handleSubmit, register, watch, unregister } = useForm({
    defaultValues: {
      fileType: FILE_TYPE.TXT
    }
  })

  const watchFileType = watch("fileType")

  const onSubmit = async (data) => {
    if(Object.values(data).includes("")) {
      toast.error("Todos los campos son obligatorios")
      return;
    }

    let responseData;

    try {
      if(directoryId === undefined || directoryId === null) {
        responseData = await handleFileCreation(data, diskId, diskId)
  
      } else {
        responseData = await handleFileCreation(data, diskId, directoryId)
      }

      if(responseData) {
        await getFilesFromDiskOrFromDirectory()

        toast.success(responseData.message)
        handleClose()
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleFileCreation = async (data, diskId, directoryId) => {
    let responseData;
    if (data.fileType === FILE_TYPE.TXT) {
      responseData = await createTxtFile(data, diskId, directoryId);
    } else {
      responseData = await createDirectory(data, diskId, directoryId);
    }

    return responseData.data;
  }

  const getFilesFromDiskOrFromDirectory = async () => {
    if(directoryId === undefined || directoryId === null) {
      const { data } = await getFilesFromDisk(diskId)
      setFiles(data)
    } else {
      const { data } = await getFilesFromDirectory(diskId, directoryId)
      setFiles(data)
    }
  }

  useEffect(() => {
    if(watchFileType !== FILE_TYPE.TXT) {
      unregister("content")
    }
  }, [watchFileType])

  return (
    <form
      className="bg-white p-2 w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-blue-500 text-center text-2xl font-bold mb-4">Nuevo Archivo</h2>

      <div className="flex gap-2 items-center mb-2">
        <label className="w-20" htmlFor="name">Nombre: </label>
        <input
          className="p-1 w-full border rounded-md border-gray-700 outline-none"
          id="name"
          type="text"
          placeholder="Mi archivo"
          name="name"
          {...register("name")}
        />

      </div>

      <div className="flex gap-2 items-center mb-2">
        <label className="w-20" htmlFor="fileType">Tipo: </label>
        <select 
          className="p-1 w-full border rounded-md border-gray-700 outline-none"
          id="fileType"
          name="fileType"
          {...register("fileType")}
        >

          <option value="TXT_FILE">Text</option>
          <option value="DIRECTORY">Directorio</option>

        </select>

      </div>

      <div className="flex flex-col gap-2 mb-2">
        <label htmlFor="description">Descripción: </label>
        <textarea
          className="p-1 w-full border rounded-md border-gray-700 outline-none"
          id="description"
          cols="30"
          rows="3"
          {...register("description")}
        ></textarea>
      </div>

      {watchFileType === FILE_TYPE.TXT && (
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="description">Contenido: </label>

          <textarea
            className="p-1 w-full border rounded-md border-gray-700 outline-none"
            id="description"
            cols="30"
            rows="6"
            {...register("content")}
          ></textarea>
        </div>
      )}

      <div className="flex justify-end">
        <input
          className="px-6 py-2 font-bold rounded-md text-white cursor-pointer bg-blue-500 hover:bg-blue-700 transition-all ease-in-out duration-300"
          type="submit" value="Crear"
        />
      </div>
    </form>
  )
}

export default FileForm