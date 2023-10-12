<script setup lang="ts">
import { onUnmounted, ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import IconSearch from '@/components/icons/IconSearch.vue';
import { useSearchEmployeesStore } from '@/stores/searchEmployees';

const {
    searchValue,
} = storeToRefs(useSearchEmployeesStore());

const timerId: Ref<ReturnType<typeof setTimeout> | null> = ref(null);

const inputedValueDelay = (event: Event): void => {
    clearTimeout(Number(timerId.value));

    timerId.value = setTimeout(() => {
        searchValue.value = (event.target as HTMLInputElement).value;
    }, 1000);
};

onUnmounted(() => {
    clearTimeout(Number(timerId.value));
});
</script>

<template>
<div class="search-employees">
    <div class="search-employees__input-wrapper">
        <input 
            class="search-employees__input input" 
            @input="inputedValueDelay" 
            type="text" 
            placeholder="Поиск сотрудника"
        >
        <IconSearch class="search-employees__input-icon" />
    </div>
    <p class="search-employees__input-description">Например: Иванов Иван</p>
</div>
</template>

<style scoped lang="scss">
.search-employees {
    padding: 30px;
}

.search-employees__input-wrapper {
    position: relative;
    margin-bottom: 10px;
}

.search-employees__input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 4px;
    border: 1px solid #e0ebef;
    background-color: #e8f1f4;
    color: var(--dark_grey, #84909b);
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
}

.search-employees__input-icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    color: var(--dark_grey, #84909b);
}

.search-employees__input-description {
    color: var(--grey, #b0bcc7);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
}
</style>
