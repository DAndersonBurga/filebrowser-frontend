import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'

const pushToStackPath = (set) => ( path ) => {
    set((state) => (
        { 
            selectedFileId: "",
            
            // Add the new path to the stackPath array
            stackPath: [...state.stackPath, path] 
        }
    ))
}

const popFromStackPath = (set) => () => {
    set((state) => (

        { 
            selectedFileId: "",

            // Remove the last element from the stackPath array
            stackPath: state.stackPath.slice(0, -1)
        }
    ))

}

const peekFromStackPath = (get) => () => {
    const stack = get().stackPath;
    return stack.length > 0 ? stack[stack.length - 1] : "";
}

const useStore = create(devtools(
    persist( (set, get) => ({
        fileSystemName: "",
        setFileSystemName: (name) => set({ fileSystemName: name }),

        disks: [],
        setDisks: (disks) => set({ disks }),
        files: [],
        setFiles: (files) => set({ files }),

        stackPath: [],
        setStackPath: (stackPath) => set({ stackPath }),

        pushToStackPath: pushToStackPath(set),
        popFromStackPath: popFromStackPath(set),
        peekFromStackPath: peekFromStackPath(get),

        currentEditingFile: {},
        setCurrentEditingFile: (currentEditingFile) => set({ currentEditingFile }),

        selectedFileId: "",
        setSelectedFileId: (selectedFileId) => set({ selectedFileId }),

        elementActionInfo: {},
        setElementActionInfo: (elementActionInfo) => set({ elementActionInfo }),

        clientWs: {},
        setClientWs: (clientWs) => set({ clientWs }),

        modalIsOpen: false,
        openModal: () => set({ modalIsOpen: true }),
        closeModal: () => {
            set({ 
                currentEditingFile: {},
                modalIsOpen: false
            })
        },
        viewFileModalIsOpen: false,
        setViewFileModalIsOpen: (viewFileModalIsOpen) => set({ viewFileModalIsOpen }),
        propertiesFileModalIsOpen: false,
        setPropertiesFileModalIsOpen: (propertiesFileModalIsOpen) => set({ propertiesFileModalIsOpen }),

        contextMenu: { visible: false, x: 0, y: 0 },
        setContextMenu: (contextMenu) => set({ contextMenu})

    }),
        {
            name: "virtual-file-system"
        } 
    )
))

export default useStore