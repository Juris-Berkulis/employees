<script setup lang="ts">
</script>

<template>
<div class="loader"></div>
</template>

<style scoped lang="scss">
@keyframes rotate {
    from {
        transform: rotateZ(0);
    }

    to {
        transform: rotateZ(360deg);
    }
}

.loader {
    aspect-ratio: 1;
    border-radius: 50%;
    border: 10px solid currentColor;
    border-right-color: transparent;
    animation: rotate 0.4s linear 0s infinite normal;
}
</style>
