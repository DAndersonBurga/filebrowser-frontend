import apiFileBrowser from "../api/apiFileBrowser"

const createFileSystem = async (data) => {
    return await apiFileBrowser.post("/file-system", {
        "name": data
    })
}

const exportFileSystem = async () => {
    return await apiFileBrowser.get("/file-system/export")
}

const uploadFileSystem = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return await apiFileBrowser.post("/file-system/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

}

const downloadFile = async (file) => {
    return await apiFileBrowser.get(`/file-system/download/${file?.diskId}/${file?.id}`, {
        responseType: "blob"
    });
}



export {
    createFileSystem,
    exportFileSystem,
    uploadFileSystem,
    downloadFile
}