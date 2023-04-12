import {create} from "zustand";
import {devtools} from "zustand/middleware";

export const useRepairRequestStore = create(devtools((set) => ({
    status: 0,
    repairNote: '',
    setRepairNote: (title) => set(({repairNote: title}))
})))