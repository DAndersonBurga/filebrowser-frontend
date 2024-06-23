import apiFileBrowser from "../api/apiFileBrowser";

const getFilesFromDirectory = async (diskId, directoryId) => {
    const response = await apiFileBrowser.get(`/file/directory/${diskId}/${directoryId}`)

    return response;
}

const createTxtFile = async (data, diskId, directoryId) => {
    const response = await apiFileBrowser.post(`/file/create-file/${diskId}/${directoryId}`, data)

    return response;
}

const createDirectory = async (data, diskId, directoryId) => {
    const response = await apiFileBrowser.post(`/file/create-folder/${diskId}/${directoryId}`, data)

    return response;
}

const copyFile = async (data) => {

    const newData = {
        sourceDiskId: data.sourceDiskId,
        sourceParentId: data.sourceParentId,
        fileId: data.fileId,
        destinationDiskId: data.destinationDiskId,
        destinationParentId: data.destinationParentId
    }

    const response = await apiFileBrowser.post(`/file/copy`, newData)

    return response;
}


export {
    getFilesFromDirectory,
    createTxtFile,
    createDirectory,
    copyFile
}