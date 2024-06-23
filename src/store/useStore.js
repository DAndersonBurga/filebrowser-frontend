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

        disks: [],
        setDisks: (disks) => set({ disks }),
        files: [],
        setFiles: (files) => set({ files }),
        stackPath: [],
        setStackPath: (stackPath) => set({ stackPath }),
        pushToStackPath: pushToStackPath(set),
        popFromStackPath: popFromStackPath(set),
        peekFromStackPath: peekFromStackPath(get),
        selectedFileId: "",
        setSelectedFileId: (selectedFileId) => set({ selectedFileId }),
        elementActionInfo: {},
        setElementActionInfo: (elementActionInfo) => set({ elementActionInfo }),
    }),
        {
            name: "virtual-file-system"
        } 
    )
))

export default useStore