import TreeView, { flattenTree } from "react-accessible-treeview";
import FolderIcon from "../icons/files/FolderIcon";
import { useEffect, useState } from "react";
import FolderOpenIcon from "../icons/files/FolderOpenIcon";
import useGlobalContext from "../hooks/useGlobalContext";
import { getTreeView } from "../helpers/files";
import { Link } from "react-router-dom";
import { FILE_TYPE } from "../constants/file";
import HardDiskIcon from "../icons/files/HardDiskIcon";

const DirectoryTreeView = () => {

  const [expandedIds, setExpandedIds] = useState([]);
  const [treeView, setTreeView] = useState({
    name: "",
    children: []
  });

  const { store } = useGlobalContext();
  const { files, disks, pushToStackPath, fileSystemName } = store;

  useEffect(() => {
    const getTree = async () => {
      const { data } = await getTreeView();
      const tree = {
        name: "",
        children: data
      }

      setTreeView(tree)
    }

    getTree();
  }, [files, disks])

  const data = flattenTree(treeView)

  const asignedRoute = (element) => {

    if (element?.metadata?.fileType === FILE_TYPE.VIRTUAL_DISK) {
      return `/app/${element?.metadata?.id}`
    }

    return `/app/${element?.metadata?.diskId}/${element?.metadata?.id}`
  }

  const handleClickElement = (element) => {
    pushToStackPath(element?.metadata?.path)
  }

  const Folder = ({ isOpen, element }) => {

    return (
      <div className={`w-6 hover:bg-white/20 rounded-md flex items-center justify-center 
        ${element?.metadata?.fileType === FILE_TYPE.VIRTUAL_DISK && isOpen ? "bg-white/20" : ""}`}
      >
        {element?.metadata?.fileType === FILE_TYPE.VIRTUAL_DISK ? (
          <HardDiskIcon className="size-5 text-gray-100" />
        ) : isOpen ? (
          <FolderOpenIcon className="size-6 text-sky-600" />
        ) : (
          <FolderIcon className="size-6 text-sky-600" />
        )}
      </div>
    )
  }

  return (
    <section className="h-full bg-gray-800 w-2/12 p-2 text-white overflow-auto">
      <h2 className="text-xl mb-2 font-bold text-wrap">{fileSystemName}</h2>

      {data.length > 1 && (
        <>
          <button
            className="p-1 bg-green-500 mb-2"
            onClick={() => setExpandedIds([])}
          >Colapsar</button>

          <TreeView
            data={data}
            arial-label="directory tree"
            expandedIds={expandedIds}
            defaultExpandedIds={[1]}
            nodeRenderer={({
              element,
              isExpanded,
              getNodeProps,
              level
            }) => (
              <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }} className="flex gap-1">

                <Folder isOpen={isExpanded} element={element} />

                <Link
                  className="pr-2 text-nowrap hover:underline underline-offset-2"
                  to={asignedRoute(element)}
                  onClick={() => handleClickElement(element)}
                >
                  {element.name}
                </Link>
              </div>
            )}
          />
        </>
      )}
    </section>
  )
}

export default DirectoryTreeView