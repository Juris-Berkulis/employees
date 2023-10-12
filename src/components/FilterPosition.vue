<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { positionList, type PositionId } from '@/data/position';
import { useSaveFilters } from '@/composables/saveFilters';
import { useFilterPositionStore } from '@/stores/filterPosition';

const {
    filterPosition,
} = storeToRefs(useFilterPositionStore());

const positionId: Ref<PositionId | false> = ref(false);

useSaveFilters(filterPosition, positionId);
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
