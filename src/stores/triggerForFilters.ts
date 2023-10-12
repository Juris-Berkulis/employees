import { ref, type Ref } from 'vue';
import { defineStore } from "pinia";

export const useTriggerForFilters = defineStore('triggerForFilters', () => {
    const triggerForSaveFilters: Ref<number> = ref(0);

    return {
        triggerForSaveFilters,
    }
});
