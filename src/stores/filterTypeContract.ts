import { ref, type Ref, computed, type ComputedRef } from 'vue';
import { defineStore } from 'pinia';
import type { TypeContractId } from '@/data/typeContract';
import type { ActionOfChange } from '@/composables/filtersCpecific';
import { useCheckType } from '@/composables/checkType';

const { valueShouldBeNever } = useCheckType();

export type FilterTypeContract = {
    [key in TypeContractId]?: boolean;
};

export const useFilterTypeContractStore = defineStore('filterTypeContract', () => {
    const filterTypeContract: Ref<FilterTypeContract> = ref({});
    const filterTypeContractLocal: Ref<FilterTypeContract> = ref({});

    const isFilterTypeContractEnabled: ComputedRef<boolean> = computed(() => {
        for (let key in filterTypeContract.value) {
            if (filterTypeContract.value[key as unknown as keyof FilterTypeContract]) return true
        }

        return false
    });

    const applayFilterTypeContract = (): void => {
        for (let key in filterTypeContractLocal.value) {
            const id: keyof FilterTypeContract = key as unknown as keyof FilterTypeContract;
            filterTypeContract.value[id] = filterTypeContractLocal.value[id];
        }
    };

    const resetFilterTypeContract = (): void => {
        filterTypeContract.value = {};
        filterTypeContractLocal.value = {};
    };

    const changeFilterTypeContract = (actionOfChange: ActionOfChange): void => {
        if (actionOfChange === 'applay') applayFilterTypeContract();
        else if (actionOfChange === 'reset') resetFilterTypeContract();
        else valueShouldBeNever(actionOfChange);
    };

    return {
        filterTypeContract,
        filterTypeContractLocal,
        isFilterTypeContractEnabled,
        changeFilterTypeContract,
    }
});
