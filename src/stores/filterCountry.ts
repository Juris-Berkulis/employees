import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { CountryId } from "@/data/country";

export const useFilterCountryStore = defineStore('filterCountry', () => {
    const filterCountry: Ref<CountryId | ''> = ref('');
    const filterCountryLocal: Ref<CountryId | ''> = ref('');

    const applayFilterCountry = (): void => {
        filterCountry.value = filterCountryLocal.value;
    };

    const resetFilterCountry = (): void => {
        filterCountry.value = '';
        filterCountryLocal.value = '';
    };

    return {
        filterCountry,
        filterCountryLocal,
        applayFilterCountry,
        resetFilterCountry,
    }
});
