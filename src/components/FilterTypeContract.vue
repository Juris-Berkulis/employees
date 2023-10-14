<script setup lang="ts">
import { storeToRefs } from 'pinia';
import IconCheck from '@/components/icons/IconCheck.vue';
import { typeContractList, type TypeContractId } from '@/data/typeContract';
import { useFilterTypeContractStore } from '@/stores/filterTypeContract';

const {
    filterTypeContractLocal,
} = storeToRefs(useFilterTypeContractStore());

const isActive = (id: TypeContractId): boolean | undefined => {
    return filterTypeContractLocal.value[id]
};
</script>

<template>
<div class="filter-type-contract">
    <h3 class="filter-type-contract__title filter__title">Тип договора</h3>
    <div class="filter-type-contract__filters-list">
        <div 
            class="filter-type-contract__filter-item" 
            :class="{'filter-type-contract__filter-item_checked': isActive(typeContract.id)}"
            @click="filterTypeContractLocal[typeContract.id] = !filterTypeContractLocal[typeContract.id]" 
            v-for="typeContract of typeContractList" 
            :key="typeContract.id"
        >
            <div class="filter-type-contract__checkbox checkbox">
                <IconCheck class="checkbox__icon" v-if="isActive(typeContract.id)" />
            </div>
            <span class="filter-type-contract__label">{{ typeContract.title }}</span>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.filter-type-contract__filters-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.filter-type-contract__filter-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.filter-type-contract__checkbox {
    width: 20px;
    height: 20px;
}

.checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    background-color: var(--white, #ffffff);

    .filter-type-contract__filter-item_checked & {
        background-color: #005cc8;
        color: var(--white, #ffffff);
    }
}

.filter-type-contract__label {
    display: flex;
    color: var(--black, #041423);
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 135%;
}
</style>
