<script setup lang="ts">
import IconSelectArrow from '@/components/icons/IconSelectArrow.vue';
import { type Country, type CountryId } from '@/data/country';

interface Props {
    title: string,
    defaultValue: string,
    optionsList: Country[],
    select: false | CountryId,
};

defineProps<Props>();

const emit = defineEmits(['update:select']);

const changeSelectValue = (event: Event) => {
    const newSelectValue = +(event.target as HTMLSelectElement).value;
    emit('update:select', newSelectValue || false);
};
</script>

<template>
<div class="filter">
    <h3 class="filter__title">{{ title }}</h3>
    <div class="filter__select-wrapper">
        <select 
            class="filter__select select"
            :class="{select_black: select !== false}"
            @change="changeSelectValue" 
            :value="select"
        >
            <option 
                class="select__option" 
                :value="false"
            >{{ defaultValue }}</option>
            <option 
                class="select__option select__option_black" 
                v-for="option of optionsList" 
                :value="option.id"
            >{{ option.title }}</option>
        </select>
        <IconSelectArrow class="select__arrow" />
    </div>
</div>
</template>

<style scoped lang="scss">
$bc-select: #e8f1f4;

.filter__title {
    margin-bottom: 10px;
    color: var(--black, #041423);
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
}

.filter__select-wrapper {
    position: relative;
    width: 100%;
    display: inline-block;
}

.filter__select {
    width: 100%;
}

.select {
    padding: 12px 16px;
    border-radius: 4px;
    border: 1px solid #e0ebef;
    background-color: $bc-select;
    color: var(--dark_grey, #84909b);
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;

    &_black {
        color: var(--black, #041423);
    }
}

.select__option {
    padding: 12px 16px;
    color: currentColor;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;

    &_black {
        color: var(--black, #041423);
    }
}

.select__arrow {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    padding: 0 16px 0 10px;
    box-sizing: content-box;
    background-color: $bc-select;
    pointer-events: none;
}
</style>
