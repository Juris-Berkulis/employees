<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { countryList, type CountryId } from '@/data/country';
import { useFilterCountryStore } from '@/stores/filterCountry';
import { useTriggerForFilters } from '@/stores/triggerForFilters';

const {
    triggerForSaveFilters,
} = storeToRefs(useTriggerForFilters());

const {
    filterCountry,
} = storeToRefs(useFilterCountryStore());

const tracker: Ref<number> = ref(triggerForSaveFilters.value);
const countryId: Ref<CountryId | false> = ref(false);

watch(triggerForSaveFilters, () => {
    if (triggerForSaveFilters.value > tracker.value) {
        filterCountry.value = countryId.value;
    } else if (triggerForSaveFilters.value < tracker.value) {
        filterCountry.value = false;
        countryId.value = false;
    }
    tracker.value = triggerForSaveFilters.value 
});
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
