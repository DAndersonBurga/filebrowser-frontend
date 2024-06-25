import { useEffect } from "react"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { FILE_TYPE } from "../constants/file"
import { createDirectory, createTxtFile, editFile, getFilesFromDirectory } from "../helpers/files"
import { getFilesFromDisk } from "../helpers/disks"
import useGlobalContext from "../hooks/useGlobalContext"

const FileForm = ({ handleClose }) => {

  const { store } = useGlobalContext()
  const { setFiles, currentEditingFile } = store

  const { diskId, directoryId } = useParams()
  const { handleSubmit, register, watch, unregister } = useForm({
    defaultValues: {
      fileType: currentEditingFile?.fileType || FILE_TYPE.TXT_FILE,
      name: currentEditingFile?.name || "",
      description: currentEditingFile?.description || "",
      content: currentEditingFile?.content || ""
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

      // Logic to edit file
      if(currentEditingFile?.id) {
        responseData = await editFile(data, diskId, currentEditingFile.id)
      } else {

        // Logic to create file
        if(!directoryId) {
          responseData = await creationFile(data, diskId, diskId)
    
        } else {
          responseData = await creationFile(data, diskId, directoryId)
        }
      }

      // get files from disk or from directory after create or edit file
      if(responseData) {
        await getFilesFromDiskOrFromDirectory()

        toast.success(responseData.message)
        handleClose()
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const creationFile = async (data, diskId, directoryId) => {
    let responseData;
    if (data.fileType === FILE_TYPE.TXT) {
      responseData = await createTxtFile(data, diskId, directoryId);
    } else {
      responseData = await createDirectory(data, diskId, directoryId);
    }

    return responseData.data;
  }

  const getFilesFromDiskOrFromDirectory = async () => {
    if(!directoryId) {
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
      <h2 className="text-blue-500 text-center text-2xl font-bold mb-4">{currentEditingFile?.id ? "Editar" : "Nuevo"} Archivo</h2>

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
          disabled={currentEditingFile?.id}
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
          type="submit" value={currentEditingFile?.id ? "Actualizar" : "Crear"}
        />
      </div>
    </form>
  )
}

export default FileForm