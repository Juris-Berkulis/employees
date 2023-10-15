import { ref, type Ref } from 'vue';
import type { CountryId } from "@/data/country";
import type { GenderId } from "@/data/gender";
import type { PositionId } from "@/data/position";
import { useCheckType } from '@/composables/checkType';

const { valueShouldBeNever } = useCheckType();

type FilterAside = CountryId | GenderId | PositionId;
export type ActionOfChange = 'applay' | 'reset';

export const useFiltersAside = <T extends FilterAside>() => {
    const defaultValue: '' = '';

    const filterGlobal: Ref<T | typeof defaultValue> = ref(defaultValue);
    const filterLocal: Ref<T | typeof defaultValue> = ref(defaultValue);

    const applayFilter = (): void => {
        filterGlobal.value = filterLocal.value;
    };

    const resetFilter = (): void => {
        filterGlobal.value = defaultValue;
        filterLocal.value = defaultValue;
    };

    const changeFilter = (actionOfChange: ActionOfChange) => {
        if (actionOfChange === 'applay') applayFilter();
        else if (actionOfChange === 'reset') resetFilter();
        else valueShouldBeNever(actionOfChange);
    };

    return {
        filterGlobal,
        filterLocal,
        changeFilter,
    }
};
