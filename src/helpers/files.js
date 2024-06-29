import apiFileBrowser from "../api/apiFileBrowser";

const getTreeView = async () => {
    const response = await apiFileBrowser.get('/file/tree')

    return response;

}

const getFilesFromDirectory = async (diskId, directoryId) => {
    const response = await apiFileBrowser.get(`/file/directory/${diskId}/${directoryId}`)

    return response;
}

const createTxtFile = async (fileData, diskId, directoryId) => {
    const { fileType, ...data } = fileData;
    const response = await apiFileBrowser.post(`/file/create-file/${diskId}/${directoryId}`, data)

    return response;
}

const createDirectory = async (fileData, diskId, directoryId) => {
    const { fileType, ...data } = fileData;
    const response = await apiFileBrowser.post(`/file/create-folder/${diskId}/${directoryId}`, data)

    return response;
}

const deleteFile = async (idDisk, idParent, idFile) => {
    const response = await apiFileBrowser.delete(`/file/delete/${idDisk}/${
        idParent ? idParent : idDisk
    }/${idFile}`)

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

    return await apiFileBrowser.post(`/file/copy`, newData)
}

const cutFile = async (data) => {
    const newData = {
        sourceDiskId: data.sourceDiskId,
        sourceParentId: data.sourceParentId,
        fileId: data.fileId,
        destinationDiskId: data.destinationDiskId,
        destinationParentId: data.destinationParentId
    }

    return await apiFileBrowser.post(`/file/cut`, newData)
}

const editFile = async (fileData, diskId, fileId) => {
    const { fileType, ...data } = fileData;
    return await apiFileBrowser.put(`/file/edit/${diskId}/${fileId}`, data) 
}

const findWithPath = async (path) => {
    return await apiFileBrowser.get(`/file/path?path=${path}`);
}

export {
    getFilesFromDirectory,
    createTxtFile,
    createDirectory,
    copyFile,
    cutFile,
    deleteFile,
    editFile,
    findWithPath,
    getTreeView
}