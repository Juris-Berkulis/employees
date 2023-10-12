<script setup lang="ts">
import EmployeesList from '@/components/EmployeesList.vue';
import FilterStaffTag from '@/components/FilterStaffTag.vue';

</script>

<template>
<EmployeesList>
    <template #filter>
        <FilterStaffTag />
    </template>
</EmployeesList>
</template>

<style scoped lang="scss">
</style>
