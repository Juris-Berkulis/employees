<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { countryList, type CountryId } from '@/data/country';
import { useSaveFilters } from '@/composables/saveFilters';
import { useFilterCountryStore } from '@/stores/filterCountry';

const {
    filterCountry,
} = storeToRefs(useFilterCountryStore());

const countryId: Ref<CountryId | ''> = ref('');

useSaveFilters(filterCountry, countryId);
</script>

<template>
<BaseSelect 
    v-model:select="countryId" 
    title="Гражданство" 
    defaultValue="Все страны" 
    :optionsList="countryList" 
/>
</template>

<style scoped lang="scss">
</style>
