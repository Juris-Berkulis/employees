import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { CountryId } from "@/data/country";

export const useFilterCountryStore = defineStore('filterCountry', () => {
    const filterCountry: Ref<CountryId | ''> = ref('');

    return {
        filterCountry,
    }
});
