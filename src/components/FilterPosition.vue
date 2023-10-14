<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { positionList } from '@/data/position';
import { useFilterPositionStore } from '@/stores/filterPosition';

const { filterPositionLocal } = storeToRefs(useFilterPositionStore());
</script>

<template>
<BaseSelect 
    v-model:select="filterPositionLocal" 
    title="Должность" 
    defaultValue="Все должности" 
    :optionsList="positionList" 
/>
</template>

<style scoped lang="scss">
</style>
