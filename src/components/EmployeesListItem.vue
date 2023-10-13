<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import type { Employee } from '@/data/employees';

interface Props {
    employee: Employee
};

const props = defineProps<Props>();

const pasport: ComputedRef<string> = computed(() => {
    return `${props.employee.passport.slice(0, 4)} ${props.employee.passport.slice(4)}`
});
</script>

<template>
<div class="employee employee__item">
    <div class="employee__line">
        <h2 class="employee__title">{{ employee.full_name }}</h2>
        <p class="employee__inn">ИНН {{ employee.inn }}</p>
        <div class="employee__contract">{{ employee.type_contract.title }}</div>
        <p class="employee__text">{{ employee.position.name }}</p>
    </div>
    <div class="employee__line">
        <img class="employee__flag-img" :src="employee.country.icon" :alt="employee.country.slug">
        <p class="employee__text employee__text_upper-case">{{ employee.country.slug }} {{ pasport }}</p>
        <p class="employee__text">г. {{ employee.address }}</p>
        <p class="employee__text">Дата рождения: {{ employee.date_birth }}</p>
        <p class="employee__text">Возраст: {{ employee.age }} год</p>
        <p class="employee__text">Пол: {{ employee.gender.title }}</p>
    </div>
    <div class="employee__line">
        <p class="employee__description">{{ employee.status.description }}</p>
    </div>
</div>
</template>

<style scoped lang="scss">
.employee {
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 4px;
    background: var(--light_grey, #e7f3ff);
}

.employee__line {
    display: flex;
    align-items: center;
}

.employee__title {
    margin-right: 20px;
    color: var(--blue, #2a358c);
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 1;
}

.employee__inn {
    margin-right: 20px;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: var(--white, #ffffff);
    color: var(--dark_grey, #84909B);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 1;
}

.employee__contract {
    margin-right: 10px;
    padding: 4px;
    border-radius: 4px;
    background-color: var(--green, #00ae5b);
    color: var(--white, #ffffff);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 1;
}

.employee__text {
    margin-right: 30px;
    position: relative;
    color: var(--black, #041423);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;

    &:not(:last-child)::after {
        position: absolute;
        top: 0;
        right: -15px;
        width: 1px;
        height: 100%;
        background-color: #cedae5;
    }

    &_upper-case {
        text-transform: uppercase;
    }
}

.employee__flag-img {
    width: 20px;
    height: 14px;
    margin-right: 10px;
    border-radius: 2px;
}

.employee__description {
    padding: 4px 8px;
    border-radius: 4px;
    background-color: v-bind('props.employee.status.tag.color');
    color: var(--white, #ffffff);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
}
</style>
