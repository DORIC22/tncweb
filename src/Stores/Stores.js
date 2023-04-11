import {create} from "zustand";

export const useRepairRequestStore = create((set) => ({
    status: 0,
    repairNote: '',
    setRepairNote: (title) => set(({repairNote: title}))
}))