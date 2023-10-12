import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { GenderId } from "@/data/gender";

export const useFilterGenderStore = defineStore('filterGender', () => {
    const filterGender: Ref<GenderId | false> = ref(false);

    return {
        filterGender,
    }
});
