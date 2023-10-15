import { defineStore } from "pinia";
import type { CountryId } from "@/data/country";
import { useFiltersAside } from "@/composables/filtersCpecific";

export const useFilterCountryStore = defineStore('filterCountry', () => {
    const {
        filterGlobal: filterCountry,
        filterLocal: filterCountryLocal,
        changeFilter: changeFilterCountry,
    } = useFiltersAside<CountryId>();

    return {
        filterCountry,
        filterCountryLocal,
        changeFilterCountry,
    }
});
