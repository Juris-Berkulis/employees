<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import EmployeesListItem from '@/components/EmployeesListItem.vue';
import IconSpiner from '@/components/icons/IconSpiner.vue';
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

const loadStep: number = 4;
const listPart: Ref<number> = ref(1);
const isLoading: Ref<boolean> = ref(false);
const timerId: Ref<ReturnType<typeof setTimeout> | undefined> = ref();

const nextListPart = (): void => {
    isLoading.value = true;
    timerId.value = setTimeout(() => {
        listPart.value++;
        isLoading.value = false;
    }, 2000);
};

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

const employeesListForShow: ComputedRef<Employee[]> = computed(() => {
    return employeesListWithSorting.value.slice(0, listPart.value * loadStep)
});

onBeforeUnmount(() => {
    clearTimeout(Number(timerId.value));
});
</script>

<template>
<div class="employees-list">
    <h1 class="employees-list__title">Список сотрудников</h1>
    <slot class="employees-list__filter-slot" name="filter" />
    <div class="employees-list__items-list">
        <p class="employees-list__empty" v-if="!employeesData.length">Нет сотрудников</p>
        <p class="employees-list__empty" 
            v-else-if="!employeesListForShow.length"
        >По данному запросу сотрудники не найдены</p>
        <EmployeesListItem 
            v-for="employee of employeesListForShow" 
            :key="employee.inn" 
            :employee="employee" 
        />
    </div>
    <button 
        class="employees-list__more-btn button button_rectangle button_animation"
        v-if="employeesListForShow < employeesListWithSorting"
        @click="nextListPart"
    >
        <IconSpiner 
            class="employees-list__more-icon" 
            :class="{'employees-list__more-icon_stop': !isLoading}"
        />
        <span class="employees-list__more-text">Показать еще</span>
    </button>
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

.employees-list__more-btn {
    display: block;
    margin: 0 auto 30px;
    padding: 14px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--blue, #2a358c);
    border: 1px solid currentColor;
    box-shadow: $bsh-rectangle rgba(42, 53, 140, 0.20);
}

.employees-list__more-icon {
    @keyframes spiner {
        from {
            transform: rotateZ(0);
        }

        to {
            transform: rotateZ(-360deg);
        }
    }

    animation: spiner 1s linear 0s infinite normal;

    &_stop {
        animation-play-state: paused;
    }
}

.employees-list__more-text {
    color: currentColor;
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
}
</style>
