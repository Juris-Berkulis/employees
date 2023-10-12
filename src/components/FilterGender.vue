<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import BaseSelect from '@/components/base/BaseSelect.vue';
import { genderList, type GenderId } from '@/data/gender';
import { useFilterGenderStore } from '@/stores/filterGender';
import { useTriggerForFilters } from '@/stores/triggerForFilters';

const {
    triggerForSaveFilters,
} = storeToRefs(useTriggerForFilters());

const {
    filterGender,
} = storeToRefs(useFilterGenderStore());

const tracker: Ref<number> = ref(triggerForSaveFilters.value);
const genderId: Ref<GenderId | false> = ref(false);

watch(triggerForSaveFilters, () => {
    if (triggerForSaveFilters.value > tracker.value) {
        filterGender.value = genderId.value;
    } else if (triggerForSaveFilters.value < tracker.value) {
        filterGender.value = false;
        genderId.value = false;
    }
    tracker.value = triggerForSaveFilters.value 
});
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
