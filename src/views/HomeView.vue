<script setup lang="ts">
import SearchEmployees from '@/components/SearchEmployees.vue';
import EmployeesList from '@/components/EmployeesList.vue';
import FilterStaffTag from '@/components/FilterStaffTag.vue';
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
    <aside class="home-page__aside">
        
    </aside>
</div>
</template>

<style scoped lang="scss">
//* box-shadow:
$bsh: 0px 7px 30px 0px rgba(42, 53, 140, 0.03);

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
    box-shadow: $bsh;
}

.home-page__search-employees {
    border-bottom: 1px solid var(--line, #dbe4ed);
}

.home-page__aside {
    width: 587px;
    border-radius: 10px;
    background-color: var(--white, #ffffff);
    box-shadow: $bsh;
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media (max-width: $sp-l) {
        & {
            width: 100%;
        }
    }
}
</style>
