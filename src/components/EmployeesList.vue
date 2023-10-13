<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import EmployeesListItem from '@/components/EmployeesListItem.vue';
import { type Employee } from '@/data/employees';
import { useEmployeesDataStore } from '@/stores/employeesData';
import { useFilterStaffTagStore } from '@/stores/filterStaffTag';
import { useSearchEmployeesStore } from '@/stores/searchEmployees';
import { useFilterCountryStore } from '@/stores/filterCountry';
import { useFilterGenderStore } from '@/stores/filterGender';
import { useFilterPositionStore } from '@/stores/filterPosition';
import { useFilterTypeContractStore } from '@/stores/filterTypeContract';
import { useFilterEmployeesBySpecificCriterion } from '@/composables/filterEmployeesBySpecificCriterion';

const {
    employeesData,
} = storeToRefs(useEmployeesDataStore());

const {
    filterCountry,
} = storeToRefs(useFilterCountryStore());

const {
    filterGender,
} = storeToRefs(useFilterGenderStore());

const {
    filterPosition,
} = storeToRefs(useFilterPositionStore());

const {
    filterTypeContract,
    isFilterTypeContractEnabled,
} = storeToRefs(useFilterTypeContractStore());

const {
    searchValue,
} = storeToRefs(useSearchEmployeesStore());

const filterStaffTagStore = useFilterStaffTagStore();

const {
    filterStaffTag,
    isFilterStaffTagEnabled,
} = storeToRefs(filterStaffTagStore);

const employeesListWithFilteredCountry = useFilterEmployeesBySpecificCriterion(employeesData, filterCountry, 'country');
const employeesListWithFilteredGender = useFilterEmployeesBySpecificCriterion(employeesListWithFilteredCountry, filterGender, 'gender');
const employeesListWithFilteredPosition = useFilterEmployeesBySpecificCriterion(employeesListWithFilteredGender, filterPosition, 'position');

const employeesListWithFilteredTypeContract: ComputedRef<Employee[]> = computed(() => {
    if (isFilterTypeContractEnabled.value) return employeesListWithFilteredPosition.value.filter((employee) => filterTypeContract.value[employee.type_contract.id])
    else return employeesListWithFilteredPosition.value
});

const employeesListWithFilteredStaffTag: ComputedRef<Employee[]> = computed(() => {
    if (isFilterStaffTagEnabled.value) return employeesListWithFilteredTypeContract.value.filter((employee) => filterStaffTag.value[employee.status.tag.id])
    else return employeesListWithFilteredTypeContract.value
});

const employeesListWithSearch: ComputedRef<Employee[]> = computed(() => {
    return employeesListWithFilteredStaffTag.value.filter((employee) => {
        return employee.full_name.toLowerCase().includes(searchValue.value.toLowerCase())
    })
});

const employeesListWithSorting: ComputedRef<Employee[]> = computed(() => {
    return [...employeesListWithSearch.value].sort((employee1, employee2) => {
        return employee1.status.tag.id - employee2.status.tag.id
    })
});
</script>

<template>
<div class="employees-list">
    <h1 class="employees-list__title">Список сотрудников</h1>
    <slot class="employees-list__filter-slot" name="filter" />
    <div class="employees-list__items-list">
        <p class="employees-list__empty" v-if="!employeesData.length">Нет сотрудников</p>
        <p class="employees-list__empty" v-else-if="!employeesListWithSorting.length">По данному запросу сотрудники не найдены</p>
        <EmployeesListItem 
            v-for="employee of employeesListWithSorting" 
            :key="employee.inn" 
            :employee="employee" 
        />
    </div>
</div>
</template>

<style scoped lang="scss">
.employees-list {
    padding: 30px 40px;
}

.employees-list__title {
    margin-bottom: 20px;
    color: var(--black, #041423);
    font-family: Montserrat;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
}

.employees-list__filter-slot {
    margin-bottom: 20px;
}

.employees-list__items-list {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.employees-list__empty {
    color: var(--black, #041423);
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
}
</style>
