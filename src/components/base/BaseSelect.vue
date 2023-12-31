<script setup lang="ts">
import IconSelectArrow from '@/components/icons/IconSelectArrow.vue';
import type { Country, CountryId } from '@/data/country';
import type { Gender, GenderId } from '@/data/gender';
import type { Position, PositionId } from '@/data/position';
import type { StaffTag, StaffTagId } from '@/data/staffTag';
import type { TypeContract, TypeContractId } from '@/data/typeContract';

type Option = Country | Gender | Position | TypeContract | StaffTag;

interface Props<T extends Option = Option> {
    title?: string,
    defaultValue: string,
    optionsList: T[],
    select: '' | (
        T extends Country ? CountryId : 
        T extends Gender ? GenderId : 
        T extends Position ? PositionId : 
        T extends TypeContract ? TypeContractId : 
        T extends StaffTag ? StaffTagId : 
        never
    ),
};

defineProps<Props>();

const emit = defineEmits(['update:select']);

const changeSelectValue = (event: Event) => {
    const newSelectValue = +(event.target as HTMLSelectElement).value;
    emit('update:select', newSelectValue || '');
};
</script>

<template>
<div class="filter">
    <h3 class="filter__title" v-if="title">{{ title }}</h3>
    <div class="filter__select-wrapper">
        <select 
            class="filter__select select"
            :class="{select_black: select !== ''}"
            @change="changeSelectValue" 
            :value="select"
        >
            <option 
                class="select__option" 
                value=""
            >{{ defaultValue }}</option>
            <option 
                class="select__option select__option_black" 
                v-for="option of optionsList" 
                :value="option.id"
            >{{ (<Position>option).name || (<Country | Gender | TypeContract | StaffTag>option).title }}</option>
        </select>
        <IconSelectArrow class="select__arrow" />
    </div>
</div>
</template>

<style scoped lang="scss">
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
    background-color: #e8f1f4;
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
    pointer-events: none;
}
</style>
