import { ref, type Ref, reactive, computed, type ComputedRef } from 'vue';
import { defineStore } from 'pinia';
import type { StaffTagId } from '@/data/staffTag';

type FilterStaffTag = {
    [key in StaffTagId]?: boolean;
};

export const useFilterStaffTagStore = defineStore('filterStaffTag', () => {
    const filterStaffTag: Ref<FilterStaffTag> = ref({});

    const isFilterStaffTagEnabled: ComputedRef<boolean> = computed(() => {
        for (let key in filterStaffTag.value) {
            if (filterStaffTag.value[key as unknown as keyof FilterStaffTag]) return true
        }

        return false
    });

    const resetFilterStaffTag = (): void => {
        for (let key in filterStaffTag.value) {
            filterStaffTag.value[key as unknown as keyof FilterStaffTag] = false;
        }
    };

    return {
        filterStaffTag,
        isFilterStaffTagEnabled,
        resetFilterStaffTag,
    }
});
