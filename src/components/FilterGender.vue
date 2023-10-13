<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { genderList, type GenderId } from '@/data/gender';
import { useSaveFilters } from '@/composables/saveFilters';
import { useFilterGenderStore } from '@/stores/filterGender';

const {
    filterGender,
} = storeToRefs(useFilterGenderStore());

const genderId: Ref<GenderId | ''> = ref('');

useSaveFilters(filterGender, genderId);
</script>

<template>
<BaseSelect 
    v-model:select="genderId" 
    title="Пол" 
    defaultValue="Без разницы" 
    :optionsList="genderList" 
/>
</template>

<style scoped lang="scss">
</style>
