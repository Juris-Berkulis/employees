<script setup lang="ts">
import { storeToRefs } from 'pinia';
import FilterCountry from '@/components/FilterCountry.vue';
import FilterGender from '@/components/FilterGender.vue';
import FilterPosition from '@/components/FilterPosition.vue';
import FilterTypeContract from '@/components/FilterTypeContract.vue';
import { useTriggerForFilters } from '@/stores/triggerForFilters';

const {
    triggerForSaveFilters,
} = storeToRefs(useTriggerForFilters());

const applyFilters = (): void => {
    triggerForSaveFilters.value++;
};

const resetFilters = (): void => {
    triggerForSaveFilters.value--;
};
</script>

<template>
<aside class="aside">
    <div class="aside__filters filters">
        <h2 class="filters__title column column_x2">Фильтр</h2>
        <FilterCountry class="filters__item column column_x1" />
        <FilterGender class="filters__item column column_x1" />
        <FilterPosition class="filters__item column column_x2" />
        <FilterTypeContract class="filters__item column column_x2" />
        <div class="filters__btns column column_x2">
            <button class="filters__btn" @click="applyFilters">Применить</button>
            <button class="filters__btn" @click="resetFilters">Очистить</button>
        </div>
    </div>
</aside>
</template>

<style scoped lang="scss">
:deep(.filter__title) {
    margin-bottom: 10px;
    color: var(--black, #041423);
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
}

.aside {
    border-radius: 10px;
    background-color: var(--white, #ffffff);
    box-shadow: --bsh;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.filters {
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
}

.column_x2 {
    grid-column: auto/span 2;
}

.filters__title {
    color: var(--black, #041423);
    font-family: Montserrat;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; 
}

.filters__btns {
    padding-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    border-top: 1px solid var(--line, #dbe4ed);
}
</style>
