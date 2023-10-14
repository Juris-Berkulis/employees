<script setup lang="ts">
interface Props {
    inputedValue: string,
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
    :value="inputedValue"
    :placeholder="placeholder"
    @input="changeInputedValue" 
    type="type"
>
</template>

<style scoped lang="scss">
.input {
    padding: 12px 16px;
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
}
</style>
