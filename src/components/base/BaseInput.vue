<script setup lang="ts">
interface Props {
    inputedValue: string,
    error: string,
    placeholder: string,
};

defineProps<Props>();

const emit = defineEmits(['update:inputedValue']);

const changeInputedValue = (event: Event): void => {
    emit('update:inputedValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
<input 
    class="input"
    :class="{error}"
    :value="inputedValue"
    :placeholder="placeholder"
    @input="changeInputedValue" 
    type="type"
>
</template>

<style scoped lang="scss">
.input {
    padding: 18px 24px;
    color: var(--white, #ffffff);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.2s linear;

    &::placeholder {
        color: #cccccc;
    }

    &:focus {
        background-color: rgba(255, 255, 255, 0.2);
    }

    &.error {
        color: rgba(236, 63, 63, 1);
        background-color: rgba(236, 63, 63, 0.2);

        &::placeholder {
            color: rgba(236, 63, 63, 0.5);
        }
    }
}
</style>
