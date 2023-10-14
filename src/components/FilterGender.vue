<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { genderList } from '@/data/gender';
import { useFilterGenderStore } from '@/stores/filterGender';

const { filterGenderLoacal } = storeToRefs(useFilterGenderStore());
</script>

<template>
<BaseSelect 
    v-model:select="filterGenderLoacal" 
    title="Пол" 
    defaultValue="Без разницы" 
    :optionsList="genderList" 
/>
</template>

<style scoped lang="scss">
</style>
