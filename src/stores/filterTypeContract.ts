import { ref, type Ref, computed, type ComputedRef } from 'vue';
import { defineStore } from 'pinia';
import type { TypeContractId } from '@/data/typeContract';

export type FilterTypeContract = {
    [key in TypeContractId]?: boolean;
};

export const useFilterTypeContractStore = defineStore('filterTypeContract', () => {
    const filterTypeContract: Ref<FilterTypeContract> = ref({});

    const isFilterTypeContractEnabled: ComputedRef<boolean> = computed(() => {
        for (let key in filterTypeContract.value) {
            if (filterTypeContract.value[key as unknown as keyof FilterTypeContract]) return true
        }

        return false
    });

    const resetFilterTypeContract = (): void => {
        filterTypeContract.value = {};
    };

    return {
        filterTypeContract,
        isFilterTypeContractEnabled,
        resetFilterTypeContract,
    }
});
