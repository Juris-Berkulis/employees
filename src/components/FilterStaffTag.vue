<script setup lang="ts">
import { storeToRefs } from 'pinia';
import FilterStaffTagBtn from '@/components/FilterStaffTagBtn.vue';
import { staffTagList, type StaffTagId } from '@/data/staffTag';
import { useFilterStaffTagStore } from '@/stores/filterStaffTag';

const filterStaffTagStore = useFilterStaffTagStore();
const { resetFilterStaffTag } = filterStaffTagStore;
const { filterStaffTag, isFilterStaffTagEnabled } = storeToRefs(filterStaffTagStore);

const isActive = (id: StaffTagId): boolean | undefined => {
    return filterStaffTag.value[id]
};
</script>

<template>
<div class="filter-staff-tag filter-staff-tag__btns-wrapper">
    <FilterStaffTagBtn 
        class="filter-staff-tag__btn" 
        color="var(--grey, #b0bcc7)" 
        :isActive="!isFilterStaffTagEnabled"
        @click="resetFilterStaffTag" 
    >Весь список</FilterStaffTagBtn>
    <FilterStaffTagBtn 
        class="filter-staff-tag__btn" 
        v-for="staffTag of staffTagList" 
        :key="staffTag.id" 
        :color="staffTag.color" 
        :isActive="isActive(staffTag.id)"
        @click="filterStaffTag[staffTag.id] = !filterStaffTag[staffTag.id]" 
    >{{ staffTag.title }}</FilterStaffTagBtn>
</div>
</template>

<style scoped lang="scss">
.filter-staff-tag__btns-wrapper {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: $sp-m) {
        & {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
}

.filter-staff-tag__btn {
    & {
        @media (max-width: $sp-n) {
            & {
                grid-column: auto/span 2;
            }
        }
    }

    &:first-child {
        @media (max-width: $sp-m) {
            & {
                grid-column: auto/span 2;
            }
        }
    }
}
</style>
