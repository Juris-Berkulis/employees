import { ref, watch, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { CountryId } from '@/data/country';
import type { GenderId } from '@/data/gender';
import type { PositionId } from '@/data/position';
import { useTriggerForFilters } from '@/stores/triggerForFilters';

type Id = '' | CountryId | GenderId | PositionId;

export const useSaveFilters = (filter: Ref<Id>, id: Ref<Id>): void => {
    const {
        triggerForSaveFilters,
    } = storeToRefs(useTriggerForFilters());

    const trackerForSaveFilters: Ref<number> = ref(triggerForSaveFilters.value);

    watch(triggerForSaveFilters, () => {
        if (triggerForSaveFilters.value > trackerForSaveFilters.value) {
            filter.value = id.value;
        } else if (triggerForSaveFilters.value < trackerForSaveFilters.value) {
            filter.value = '';
            id.value = '';
        }
        trackerForSaveFilters.value = triggerForSaveFilters.value;
    });
};
