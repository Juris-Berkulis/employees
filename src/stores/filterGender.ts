import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { GenderId } from "@/data/gender";

export const useFilterGenderStore = defineStore('filterGender', () => {
    const filterGender: Ref<GenderId | ''> = ref('');
    const filterGenderLoacal: Ref<GenderId | ''> = ref('');

    const applayFilterGender = (): void => {
        filterGender.value = filterGenderLoacal.value;
    };

    const resetFilterGender = (): void => {
        filterGender.value = '';
        filterGenderLoacal.value = '';
    };

    return {
        filterGender,
        filterGenderLoacal,
        applayFilterGender,
        resetFilterGender,
    }
});
