import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { createDisk, getAllDisks } from "../../helpers/disks";
import useGlobalContext from "../../hooks/useGlobalContext";

const VirtualDiskForm = () => {

    const { handleSubmit, register } = useForm()

    const { store } = useGlobalContext()
    const { setDisks, closeModal } = store

    const onSubmit = async (data) => {
        if(data.label === "" || data.name === "") {
          toast.error("La etiqueta y el nombre son obligatorios")
          return;
        }
    
        try {
          const response = await createDisk(data)
          const dataResponse = await response.data;
          
          toast.success("Disco virtual creado correctamente: " + dataResponse.path)

          const { data: disksData } = await getAllDisks()
          setDisks(disksData)
    
        } catch (error) {
          const { response: { data: { errors } } } = error
          Object.values(errors).map(error => toast.error(error))
        }

        closeModal()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 text-black/85 bg-white w-96"
        >
            <h2 className="text-blue-500 text-center text-2xl font-bold mb-4">Nuevo Disco Virtual</h2>

            <div className="flex gap-2 items-center mb-2">
                <label htmlFor="label">Etiqueta: </label>
                <input
                    className="p-1 w-full border rounded-md border-gray-700 outline-none"
                    id="label"
                    type="text"
                    placeholder="A,B,C,D,...Z"
                    {...register("label")}
                />
            </div>

            <div className="flex gap-2 items-center mb-2">
                <label htmlFor="name">Nombre: </label>
                <input
                    className="p-1 w-full border rounded-md border-gray-700 outline-none"
                    id="name"
                    type="text"
                    placeholder="Mi Disco Virtual"
                    name="name"
                    {...register("name")}
                />

            </div>

            <div className="flex flex-col gap-2 mb-2">
                <label htmlFor="description">Descripción: </label>
                <textarea
                    className="p-1 w-full border rounded-md border-gray-700 outline-none"
                    id="description"
                    cols="30"
                    rows="5"
                    {...register("description")}
                ></textarea>
            </div>

            <div className="flex justify-end">
                <input
                    className="px-6 py-2 font-bold rounded-md text-white cursor-pointer bg-blue-500 hover:bg-blue-700 transition-all ease-in-out duration-300"
                    type="submit" value="Crear"
                />
            </div>

        </form>
    )
}

export default VirtualDiskForm