<script setup lang="ts">
import SearchEmployees from '@/components/SearchEmployees.vue';
import EmployeesList from '@/components/EmployeesList.vue';
import FilterStaffTag from '@/components/FilterStaffTag.vue';
import FilterAside from '@/components/FilterAside.vue';
</script>

<template>
<div class="home-page">
    <div class="home-page__general">
        <SearchEmployees class="home-page__search-employees" />
        <EmployeesList>
            <template #filter>
                <FilterStaffTag />
            </template>
        </EmployeesList>
    </div>
    <FilterAside class="home-page__aside" />
</div>
</template>

<style scoped lang="scss">
.home-page {
    display: flex;
    align-items: flex-start;
    gap: 30px;

    @media (max-width: $sp-l) {
        & {
            flex-direction: column-reverse;
            align-items: stretch;
        }
    }
}

.home-page__general {
    flex-grow: 1;
    background-color: var(--white, #ffffff);
    box-shadow: --bsh;
}

.home-page__search-employees {
    border-bottom: 1px solid var(--line, #dbe4ed);
}

.home-page__aside {
    width: 587px;

    @media (max-width: $sp-l) {
        & {
            width: 100%;
        }
    }
}
</style>
