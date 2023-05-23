import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {DeviceOptions} from "../Common/SelectOptions";

export const useRepairRequestStore = create(devtools((set) => ({
    status: 0,
    repairNote: '',
    setRepairNote: (title) => set(({repairNote: title}))
})))

export const useTechEquipmentStore = create(devtools((set) => ({
    title: '',
    type: DeviceOptions[0].value,
    sortTotalRequestsByDesc: false,
    setTitle: (title) => set(({title: title})),
    setType: (type) => set(({type: type})),
    setSortTotalRequestsByDesc: () => set((state) => ({sortTotalRequestsByDesc: !state.sortTotalRequestsByDesc}))
})))