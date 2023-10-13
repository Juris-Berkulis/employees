<script setup lang="ts">
import BaseFormFieldError from '@/components/base/BaseFormFieldError.vue';

interface Props {
    error: string,
};

defineProps<Props>();
</script>

<template>
<div class="base-form-field-wrapper base-form-field-wrapper__container">
    <slot />
    <BaseFormFieldError :error="error" />
</div>
</template>

<style scoped lang="scss">
.base-form-field-wrapper__container {
    position: relative;
}
</style>
