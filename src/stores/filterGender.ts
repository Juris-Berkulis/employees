import { defineStore } from "pinia";
import type { GenderId } from "@/data/gender";
import { useFiltersAside } from "@/composables/filtersCpecific";

export const useFilterGenderStore = defineStore('filterGender', () => {
    const {
        filterGlobal: filterGender,
        filterLocal: filterGenderLoacal,
        changeFilter: changeFilterGender,
    } = useFiltersAside<GenderId>();

    return {
        filterGender,
        filterGenderLoacal,
        changeFilterGender,
    }
});
