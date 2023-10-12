<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';

interface Props {
    color: string,
    isActive: boolean | undefined,
};

const props = defineProps<Props>();

const btnStyles: ComputedRef<{
    color: string;
    backgroundColor: string;
}> = computed(() => {
    return {
        color: props.isActive ? 'var(--white, #ffffff)' : props.color, 
        backgroundColor: props.isActive ? props.color : 'transparent',
    }
});
</script>

<template>
<button class="btn button" :style="btnStyles">
    <slot />
</button>
</template>

<style scoped lang="scss">
.btn {
    padding: 8px 15px;
    border-radius: 30px;
    border: 1px solid v-bind('props.color');
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
}
</style>
