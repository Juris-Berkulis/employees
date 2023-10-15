import { defineStore } from "pinia";
import type { PositionId } from "@/data/position";
import { useFiltersAside } from "@/composables/filtersCpecific";

export const useFilterPositionStore = defineStore('filterPosition', () => {
    const {
        filterGlobal: filterPosition,
        filterLocal: filterPositionLocal,
        changeFilter: changeFilterPosition,
    } = useFiltersAside<PositionId>();

    return {
        filterPosition,
        filterPositionLocal,
        changeFilterPosition,
    }
});
