import TreeView, { flattenTree } from "react-accessible-treeview";
import FolderIcon from "../icons/files/FolderIcon";
import TextFileIcon from "../icons/files/TextFileIcon";
import { useState } from "react";
import FolderOpenIcon from "../icons/files/FolderOpenIcon";

const DirectoryTreeView = () => {

  const [expandedIds, setExpandedIds] = useState();

  const folder = {
    name: "",
    children: [
      {
        name: "folder1",
        children: [{ name: "file1.txt" }, { name: "file2.txt" }],
      },
      {
        name: "folder2",
        children: [
          {
            name: "folder3",
            children: [{ name: "file3.txt" }],
          },
          { name: "react", children: [{ name: "file4.txt" }] },
        ],
      },
      {
        name: "file5.txt",
      },
      {
        name: "file6.txt",
      },
      {
        name: "file7.txt",
      },
    ],
  };

  const data = flattenTree(folder)

  const Folder = ({ isOpen }) => {
    return (
      <div className="w-6">
        {isOpen ? (
          <FolderOpenIcon className="size-6 text-sky-600" />
        ) : (
          <FolderIcon className="size-6 text-sky-600"/>
        )}
      </div>
    )
  }

  const File = () => {
    return <TextFileIcon className="size-6 text-gray-100" />
  }

  return (
    <section className="h-full bg-gray-800 w-2/12 p-2 text-white overflow-auto">
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
          isBranch,
          isExpanded,
          getNodeProps,
          level
        }) => (
          <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }} className="flex gap-1">
              {isBranch ? (
                <Folder isOpen={isExpanded}/>
              ) : (
                <File />
              )}

              <p className="pr-2 text-nowrap" onClick={() => {
                console.log(expandedIds);
                console.log(element);
              }}>{element.name}</p>
          </div>
        )}
      />
    </section>
  )
}

export default DirectoryTreeView