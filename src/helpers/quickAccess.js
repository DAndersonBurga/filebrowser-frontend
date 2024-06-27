import apiFileBrowser from "../api/apiFileBrowser"

const createQuickAccess = async (diskId, fileId) => {
    const response = await apiFileBrowser.post("/file/quickAccess", { diskId, fileId })
    return response
}

const getQuickAccess = async () => {
    const response = await apiFileBrowser.get("/file/quickAccess")
    return response
}

export {
    createQuickAccess,
    getQuickAccess
}