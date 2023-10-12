<script setup lang="ts">
import SearchEmployees from '@/components/SearchEmployees.vue';
import EmployeesList from '@/components/EmployeesList.vue';
import FilterStaffTag from '@/components/FilterStaffTag.vue';
</script>

<template>
<SearchEmployees />
<EmployeesList>
    <template #filter>
        <FilterStaffTag />
    </template>
</EmployeesList>
</template>

<style scoped lang="scss">
</style>
