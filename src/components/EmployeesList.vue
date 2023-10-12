<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import EmployeesListItem from '@/components/EmployeesListItem.vue';
import { employees, type Employee } from '@/data/employees';
import { useFilterStaffTagStore } from '@/stores/filterStaffTag';
import { useSearchEmployeesStore } from '@/stores/searchEmployees';
import { useFilterCountryStore } from '@/stores/filterCountry';
import { useFilterGenderStore } from '@/stores/filterGender';
import { useFilterPositionStore } from '@/stores/filterPosition';

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
    searchValue,
} = storeToRefs(useSearchEmployeesStore());

const filterStaffTagStore = useFilterStaffTagStore();

const {
    filterStaffTag,
    isFilterStaffTagEnabled,
} = storeToRefs(filterStaffTagStore);

const employeesListWithFilteredCountry: ComputedRef<Employee[]> = computed(() => {
    if (filterCountry.value) return employees.filter((employee) => employee.country.id === filterCountry.value)
    else return employees
});

const employeesListWithFilteredGender: ComputedRef<Employee[]> = computed(() => {
    if (filterGender.value) return employeesListWithFilteredCountry.value.filter((employee) => employee.gender.id === filterGender.value)
    else return employeesListWithFilteredCountry.value
});

const employeesListWithFilteredPosition: ComputedRef<Employee[]> = computed(() => {
    if (filterPosition.value) return employeesListWithFilteredGender.value.filter((employee) => employee.position.id === filterPosition.value)
    else return employeesListWithFilteredGender.value
});

const employeesListWithFilteredStaffTag: ComputedRef<Employee[]> = computed(() => {
    if (isFilterStaffTagEnabled.value) return employeesListWithFilteredPosition.value.filter((employee) => filterStaffTag.value[employee.status.tag.id])
    else return employeesListWithFilteredPosition.value
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
</style>
