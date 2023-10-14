import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { PositionId } from "@/data/position";

export const useFilterPositionStore = defineStore('filterPosition', () => {
    const filterPosition: Ref<PositionId | ''> = ref('');
    const filterPositionLocal: Ref<PositionId | ''> = ref('');

    const applayFilterPosition = (): void => {
        filterPosition.value = filterPositionLocal.value;
    };

    const resetFilterPosition = (): void => {
        filterPosition.value = '';
        filterPositionLocal.value = '';
    };

    return {
        filterPosition,
        filterPositionLocal,
        applayFilterPosition,
        resetFilterPosition,
    }
});
