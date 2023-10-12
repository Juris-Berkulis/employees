<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { positionList, type PositionId } from '@/data/position';
import { useFilterPositionStore } from '@/stores/filterPosition';
import { useTriggerForFilters } from '@/stores/triggerForFilters';

const {
    triggerForSaveFilters,
} = storeToRefs(useTriggerForFilters());

const {
    filterPosition,
} = storeToRefs(useFilterPositionStore());

const tracker: Ref<number> = ref(triggerForSaveFilters.value);
const positionId: Ref<PositionId | false> = ref(false);

watch(triggerForSaveFilters, () => {
    if (triggerForSaveFilters.value > tracker.value) {
        filterPosition.value = positionId.value;
    } else if (triggerForSaveFilters.value < tracker.value) {
        filterPosition.value = false;
        positionId.value = false;
    }
    tracker.value = triggerForSaveFilters.value;
});
</script>

<template>
<BaseSelect 
    v-model:select="positionId" 
    title="Должность" 
    defaultValue="Все должности" 
    :optionsList="positionList" 
/>
</template>

<style scoped lang="scss">
</style>
