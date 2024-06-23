import { Link, useParams } from "react-router-dom";
import useGlobalContext from "../hooks/useGlobalContext"
import { FILE_TYPE } from "../constants/file";
import TextFileIcon from "../icons/files/TextFileIcon";
import FolderIcon from "../icons/files/FolderIcon";
import { formatDate } from "../helpers";

const File = ({ file }) => {

    const { store } = useGlobalContext()
    const { pushToStackPath, selectedFileId, setSelectedFileId } = store;

    const { diskId } = useParams();

    const handleAuxClick = () => {
        setSelectedFileId(file.id)
    } 

    const handleClick = () => {
        console.log("Click");
        if(selectedFileId === file.id) {
            setSelectedFileId("")
            return;
        }

        setSelectedFileId(file.id)
    }

    return (
        <tr
            className="bg-white border-b  hover:bg-gray-50"
            id={file.id}
            key={file.id}
            onAuxClick={handleAuxClick}
        >
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input 
                        onClick={handleClick}
                        onChange={() => {}}
                        name="checkbox" 
                        type="checkbox" 
                        checked={selectedFileId === file.id}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                    />
                </div>
            </td>

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-1 items-center">
                {file?.fileType === FILE_TYPE.TXT ? (
                    <>
                        <TextFileIcon className="w-6 h-6 text-amber-500" />
                        {file.name}
                    </>
                ) : (
                    <Link
                        onClick={() => pushToStackPath(file.path)}
                        to={`/app/${diskId}/${file.id}`} className="flex gap-1 items-center hover:text-blue-600">
                        <FolderIcon className="w-6 h-6 text-blue-500" />
                        {file.name}
                    </Link>
                )}
            </th>
            <td className="px-6 py-4">
                {file.size}
            </td>
            <td className="px-6 py-4">
                {formatDate(file.creationAt)}
            </td>
            <td className="px-6 py-4">
                {file?.lastModifiedAt ? formatDate(file.lastModifiedAt) : ""}
            </td>
            <td className="flex items-center px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                <a href="#" className="font-medium text-red-600 hover:underline ms-3">Remove</a>
            </td>
        </tr>
    )
}

export default File