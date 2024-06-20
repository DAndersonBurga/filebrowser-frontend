import { create } from "zustand";
import { devtools } from 'zustand/middleware'

const useStore = create(devtools((set) => ({

    disks: [],
    setDisks: (disks) => set({ disks }),
    files: [],
    setFiles: (files) => set({ files }),

})))

export default useStore