import apiFileBrowser from "../api/apiFileBrowser"

const getAllDisks = async () => {
    return await apiFileBrowser.get("/file-system")
}

const createDisk = async (data) => {
    return await apiFileBrowser.post("/disk", data)
}

const getFilesFromDisk = async (diskId) => {
    return await apiFileBrowser.get(`/disk/${diskId}`)
}

export {
    getAllDisks,
    createDisk,
    getFilesFromDisk
}