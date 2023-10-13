<script setup lang="ts">
import IconPerson from '@/components/icons/IconPerson.vue';
</script>

<template>
<div class="add-employee">
    <button class="add-employee__btn button button_rectangle">
        <IconPerson class="add-employee__btn-icon" />
        <span class="add-employee__btn-text">Добавить нового сотрудника</span>
    </button>
</div>
</template>

<style scoped lang="scss">
.add-employee {
    padding: 30px;
}

.add-employee__btn {
    width: 100%;
    padding: 20px 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--white, #ffffff);
    background-color: var(--light_blue, #00b6ed);
    box-shadow: $bsh-rectangle rgba(0, 182, 237, 0.20);
}

.add-employee__btn-icon {
    color: inherit;
}

.add-employee__btn-text {
    color: inherit;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
}
</style>
