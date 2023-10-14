<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { countryList } from '@/data/country';
import { useFilterCountryStore } from '@/stores/filterCountry';

const { filterCountryLocal } = storeToRefs(useFilterCountryStore());
</script>

<template>
<BaseSelect 
    v-model:select="filterCountryLocal" 
    title="Гражданство" 
    defaultValue="Все страны" 
    :optionsList="countryList" 
/>
</template>

<style scoped lang="scss">
</style>
