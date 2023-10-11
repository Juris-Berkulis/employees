<script setup lang="ts">
import EmployeesListItem from '@/components/EmployeesListItem.vue';
import { employees } from '@/data/employees';
</script>

<template>
<div class="employees-list">
    <h1 class="employees-list__title">Список сотрудников</h1>
    <slot class="employees-list__filter-slot" name="filter" />
    <div class="employees-list__items-list">
        <EmployeesListItem v-for="employee of employees" :key="employee.inn" :employee="employee" />
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
