import { ref, type Ref, computed, type ComputedRef } from 'vue';
import { countryList, type Country, type CountryId } from "@/data/country";
import { genderList, type Gender, type GenderId } from "@/data/gender";
import { positionList, type Position, type PositionId } from "@/data/position";
import { staffTagList, type StaffTag, type StaffTagId } from "@/data/staffTag";
import { typeContractList, type TypeContract, type TypeContractId } from "@/data/typeContract";

export type Field = 'fullName' | 'inn' | 'address' | 'dateBirth' | 'passport' | 'description' 
    | 'country' | 'gender' | 'position' | 'staffTag' | 'typeContract';

type FieldInput = Exclude<Field, 'country' | 'gender' | 'position' | 'staffTag' | 'typeContract'>;

type OptionsList = Country[] | Gender[] | Position[] | StaffTag[] | TypeContract[];
export type OptionsIds = CountryId | GenderId | PositionId | StaffTagId | TypeContractId;

type FieldAdditionallyInput = { placeholder?: string };
type FieldAdditionallySelect = { 
    defaultValue?: string,
    optionsList?: OptionsList,
};

type FieldValueAndError<T> = {
    fieldValue: T, 
    fieldError: string,
} & (FieldAdditionallyInput & FieldAdditionallySelect);

type FieldsObj = {
    [key in FieldInput]: FieldValueAndError<string>;
} & {
    'country': FieldValueAndError<CountryId | ''>,
    'gender': FieldValueAndError<GenderId | ''>,
    'position': FieldValueAndError<PositionId | ''>,
    'staffTag': FieldValueAndError<StaffTagId | ''>,
    'typeContract': FieldValueAndError<TypeContractId | ''>,
};

export type FieldOptions = { isValid: (fieldValue: any) => boolean, errorText: string };

type ValidatedObj = {
    [key in Field]: FieldOptions[];
};

export const useValidation = () => {
    const regExpForFullName = /^[А-ЯЁа-яё\-]{2,}\s{1}[А-ЯЁа-яё\-]{2,}(\s{1}[А-ЯЁа-яё\-]{2,})?$/;
    const regExpForInn = /^\d{10}$/;
    const minLengthForAddress: number = 5;
    const regExpForDateBirth = /^\d{2}\.\d{2}\.\d{4}$/;
    const regExpForPassport = /^\d{10}$/;
    const textForRequiredFieldError = 'Поле не заполненно';
    const textForRegExpError = 'Неверный формат';
    const textForMinLengthError = (minLength: number): string => `Минимальная длина ${minLength} символов`;

    const fieldValueAndError = <T extends string | OptionsIds | ''>(
        params: T extends string ? FieldAdditionallyInput : FieldAdditionallySelect
    ): FieldValueAndError<T> => ({ fieldValue: <T>'', fieldError: '', ...params });

    const fieldObj: Ref<FieldsObj> = ref({
        fullName: fieldValueAndError<string>({placeholder: 'Имя'}),
        inn: fieldValueAndError<string>({placeholder: 'ИНН'}),
        address: fieldValueAndError<string>({placeholder: 'Адрес'}),
        dateBirth: fieldValueAndError<string>({placeholder: 'День рождения'}),
        passport: fieldValueAndError<string>({placeholder: 'Паспорт'}),
        description: fieldValueAndError<string>({placeholder: 'Описание сотрудника'}),
        country: fieldValueAndError<CountryId | ''>({defaultValue: 'Страна', optionsList: countryList}),
        gender: fieldValueAndError<GenderId | ''>({defaultValue: 'Пол', optionsList: genderList}),
        position: fieldValueAndError<PositionId | ''>({defaultValue: 'Должность', optionsList: positionList}),
        staffTag: fieldValueAndError<StaffTagId | ''>({defaultValue: 'Статус', optionsList: staffTagList}),
        typeContract: fieldValueAndError<TypeContractId | ''>({defaultValue: 'Тип договора', optionsList: typeContractList}),
    });

    const errorForForm: ComputedRef<boolean> = computed(() => {
        for (let field in fieldObj.value) {
            if (fieldObj.value[field as Field].fieldError) return true
        }

        return false
    });

    const requiredField = (value: string | boolean): boolean => {
        return !!value
    };

    const regExpMatching = (value: string, regExp: RegExp): boolean => {
        return regExp.test(value)
    };

    const minLength = (value: string, minStrLength: number): boolean => {
        return value.length >= minStrLength
    };

    const validatedObj: ValidatedObj = {
        fullName: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
            { isValid: (fieldValue) => regExpMatching(fieldValue, regExpForFullName), errorText: textForRegExpError },
        ],
        inn: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
            { isValid: (fieldValue) => regExpMatching(fieldValue, regExpForInn), errorText: textForRegExpError },
        ],
        address: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
            { isValid: (fieldValue) => minLength(fieldValue, minLengthForAddress), errorText: textForMinLengthError(minLengthForAddress) },
        ],
        dateBirth: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
            { isValid: (fieldValue) => regExpMatching(fieldValue, regExpForDateBirth), errorText: textForRegExpError },
        ],
        passport: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
            { isValid: (fieldValue) => regExpMatching(fieldValue, regExpForPassport), errorText: textForRegExpError },
        ],
        description: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        ],
        country: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        ],
        gender: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        ],
        position: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        ],
        staffTag: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        ],
        typeContract: [
            { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        ],
    };

    return {
        fieldObj,
        validatedObj, 
        errorForForm, 
    }
};
