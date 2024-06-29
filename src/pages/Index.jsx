import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { createFileSystem, uploadFileSystem } from "../helpers/fileSystem";
import useGlobalContext from "../hooks/useGlobalContext";

const Index = () => {

    const [name, setName] = useState("");

    const { store } = useGlobalContext();
    const { setFileSystemName } = store;

    const navigate = useNavigate()

    const handleAccessToSystem = (e) => {
        e.preventDefault()

        navigate("/app")
    }

    const handleSubmitCreateFileBrowser = async (e) => {
        e.preventDefault();

        if (name === "") {
            toast.error("El nombre no puede estar vacío")
            return;
        }

        try {
            const { data } = await createFileSystem(name);
            toast.success(data.message)
            setFileSystemName(name)

            navigate("/app")
        } catch (error) {
            toast.error("Error al crear el sistema de archivos")
        }
    }

    const handleSubmitUploadFileBrowser = async (e) => {
        e.preventDefault();

        if (e?.target[0]?.files?.length === 0) {
            toast.error("Por favor seleccione un archivo")
            return;
        }

        const file = e.target[0].files[0];
        try {
            const response = await uploadFileSystem(file);
            if (response.status == "200") {
                setFileSystemName(response.data.name)
                toast.success("Sistema de archivos cargado correctamente")
                navigate("/app")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <main style={{ backgroundColor: "rgb(32, 41, 47)" }} className=" bg-index h-screen relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8">
                <form
                    onSubmit={handleSubmitCreateFileBrowser}
                >
                    <h1 className="text-center text-white/80 font-bold text-5xl mb-6">File Browser</h1>

                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Mi Sistema de archivos 📁"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-800 text-white/80 p-2 rounded-lg w-96 border border-white/10"
                        />

                        <input
                            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 
                        ease-in-out text-white py-2 rounded-sm cursor-pointer font-bold"
                            value="Crear"
                            type="submit"
                        />
                    </div>
                </form>

                <form
                    onSubmit={handleSubmitUploadFileBrowser}
                >

                    <div className="flex flex-col gap-3">
                        <input
                            type="file"
                            accept=".json"
                            placeholder="Mi Sistema de archivos 📁"
                            className="bg-gray-800 text-white/80 p-2 rounded-lg w-96 border border-white/10"
                        />

                        <input
                            className="bg-gray-500 hover:bg-gray-600 transition-all duration-300 
                        ease-in-out text-white py-2 rounded-sm cursor-pointer font-semibold"
                            value="Cargar Sistema de archivos"
                            type="submit"
                        />
                    </div>
                </form>
            </div>

            <button
                className="absolute top-5 right-5 bg-blue-500 hover:bg-blue-700 transition-all 
            duration-300 ease-in-out text-white p-2 rounded-sm cursor-pointer font-bold"
                onClick={handleAccessToSystem}
            >
                Acceder al Sistema
            </button>
        </main>
    )
}

export default Index