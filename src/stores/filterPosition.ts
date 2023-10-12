import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { PositionId } from "@/data/position";

export const useFilterPositionStore = defineStore('filterPosition', () => {
    const filterPosition: Ref<PositionId | false> = ref(false);

    return {
        filterPosition,
    }
});
