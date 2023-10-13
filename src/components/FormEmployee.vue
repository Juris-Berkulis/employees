<script setup lang="ts">
import { ref, type ComputedRef, type Ref, computed, watch, onBeforeUnmount } from 'vue';
import BaseFormFieldWrapper from '@/components/base/BaseFormFieldWrapper.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';
import { useEmployeesDataStore } from '@/stores/employeesData';
import { useValidation } from '@/composables/validation';
import type { Employee } from '@/data/employees';
import { countryList, type CountryId } from '@/data/country';
import { positionList } from '@/data/position';
import { staffTagList } from '@/data/staffTag';
import { genderList } from '@/data/gender';
import { typeContractList } from '@/data/typeContract';

const {
    addEmployee,
} = useEmployeesDataStore();

const { 
    requiredField, 
    regExpMatching, 
    minLength, 
} = useValidation();

const regExpForFullName = /^[А-ЯЁа-яё\-]{2,}\s{1}[А-ЯЁа-яё\-]{2,}(\s{1}[А-ЯЁа-яё\-]{2,})?$/;
const regExpForInn = /^\d{10}$/;
const minLengthForAddress: number = 5;
const regExpForDateBirth = /^\d{2}\.\d{2}\.\d{4}$/;
const regExpForPassport = /^\d{10}$/;
const textForRequiredFieldError = 'Поле не заполненно';
const textForRegExpError = 'Неверный формат';
const textForMinLengthError = (minLength: number): string => `Минимальная длина ${minLength} символов`;

const isRequestSent: Ref<boolean> = ref(false);
const timerId: Ref<ReturnType<typeof setTimeout> | undefined> = ref();
const isLoading: Ref<boolean> = ref(false);

const inputedFullName: Ref<string> = ref('');
const inputedInn: Ref<string> = ref('');
const inputedAddress: Ref<string> = ref('');
const inputedDateBirth: Ref<string> = ref('');
const inputedPassport: Ref<string> = ref('');
const inputedStatusDescription: Ref<string> = ref('');
const selectedCountry: Ref<CountryId | false> = ref(false);
const selectedGender: Ref<CountryId | false> = ref(false);
const selectedPosition: Ref<CountryId | false> = ref(false);
const selectedStaffTag: Ref<CountryId | false> = ref(false);
const selectedTypeContract: Ref<CountryId | false> = ref(false);

const errorForFullName: Ref<string> = ref('');
const errorForInn: Ref<string> = ref('');
const errorForAddress: Ref<string> = ref('');
const errorForDateBirth: Ref<string> = ref('');
const errorForPassport: Ref<string> = ref('');
const errorForStatusDescription: Ref<string> = ref('');
const errorForCountry: Ref<string> = ref('');
const errorForGender: Ref<string> = ref('');
const errorForPosition: Ref<string> = ref('');
const errorForStaffTag: Ref<string> = ref('');
const errorForTypeContract: Ref<string> = ref('');

const errorForForm: ComputedRef<boolean> = computed(() => {
    return !!errorForFullName.value
        || !!errorForInn.value
        || !!errorForAddress.value
        || !!errorForDateBirth.value
        || !!errorForPassport.value
        || !!errorForStatusDescription.value
        || !!errorForCountry.value
        || !!errorForGender.value
        || !!errorForPosition.value
        || !!errorForStaffTag.value
        || !!errorForTypeContract.value
});

type Field = 'fullName' | 'inn' | 'addredd' | 'dateBirth' | 'passport' | 'description' 
    | 'country' | 'gender' | 'position' | 'staffTag' | 'typeContract';

type FieldOptions = { isValid: () => boolean, error: Ref<string>, errorText: string };

type ValidatedObj = {
    [key in Field]: FieldOptions[];
};

const validatedObj: ValidatedObj = {
    fullName: [
        { isValid: () => requiredField(inputedFullName.value), error: errorForFullName, errorText: textForRequiredFieldError },
        { isValid: () => regExpMatching(inputedFullName.value, regExpForFullName), error: errorForFullName, errorText: textForRegExpError },
    ],
    inn: [
        { isValid: () => requiredField(inputedInn.value), error: errorForInn, errorText: textForRequiredFieldError },
        { isValid: () => regExpMatching(inputedInn.value, regExpForInn), error: errorForInn, errorText: textForRegExpError },
    ],
    addredd: [
        { isValid: () => requiredField(inputedAddress.value), error: errorForAddress, errorText: textForRequiredFieldError },
        { isValid: () => minLength(inputedAddress.value, minLengthForAddress), error: errorForAddress, errorText: textForMinLengthError(minLengthForAddress) },
    ],
    dateBirth: [
        { isValid: () => requiredField(inputedDateBirth.value), error: errorForDateBirth, errorText: textForRequiredFieldError },
        { isValid: () => regExpMatching(inputedDateBirth.value, regExpForDateBirth), error: errorForDateBirth, errorText: textForRegExpError },
    ],
    passport: [
        { isValid: () => requiredField(inputedPassport.value), error: errorForPassport, errorText: textForRequiredFieldError },
        { isValid: () => regExpMatching(inputedPassport.value, regExpForPassport), error: errorForPassport, errorText: textForRegExpError },
    ],
    description: [
        { isValid: () => requiredField(inputedStatusDescription.value), error: errorForStatusDescription, errorText: textForRequiredFieldError },
    ],
    country: [
        { isValid: () => requiredField(selectedCountry.value), error: errorForCountry, errorText: textForRequiredFieldError },
    ],
    gender: [
        { isValid: () => requiredField(selectedGender.value), error: errorForGender, errorText: textForRequiredFieldError },
    ],
    position: [
        { isValid: () => requiredField(selectedPosition.value), error: errorForPosition, errorText: textForRequiredFieldError },
    ],
    staffTag: [
        { isValid: () => requiredField(selectedStaffTag.value), error: errorForStaffTag, errorText: textForRequiredFieldError },
    ],
    typeContract: [
        { isValid: () => requiredField(selectedTypeContract.value), error: errorForTypeContract, errorText: textForRequiredFieldError },
    ],
};

const checkField = (field: Field) => {
    for (let i = 0; i < validatedObj[field].length; i++) {
        const fieldOptions: FieldOptions = validatedObj[field][i];

        if (!fieldOptions.isValid()) {
            fieldOptions.error.value = fieldOptions.errorText; return
        }
    }

    validatedObj[field][0].error.value = '';
};

const checkAllFields = (): void => {
    for (let field in validatedObj) {
        checkField(field as Field);
    }
};

watch(inputedFullName, () => checkField('fullName'));
watch(inputedInn, () => checkField('inn'));
watch(inputedAddress, () => checkField('addredd'));
watch(inputedDateBirth, () => checkField('dateBirth'));
watch(inputedPassport, () => checkField('passport'));
watch(inputedStatusDescription, () => checkField('description'));
watch(selectedCountry, () => checkField('country'));
watch(selectedGender, () => checkField('gender'));
watch(selectedPosition, () => checkField('position'));
watch(selectedStaffTag, () => checkField('staffTag'));
watch(selectedTypeContract, () => checkField('typeContract'));

const resetForm = (): void => {
    inputedFullName.value = '';
    inputedInn.value = '';
    inputedAddress.value = '';
    inputedDateBirth.value = '';
    inputedPassport.value = '';
    inputedStatusDescription.value = '';
    selectedCountry.value = false;
    selectedGender.value = false;
    selectedPosition.value = false;
    selectedStaffTag.value = false;
    selectedTypeContract.value = false;
};

const submit = (): void => {
    checkAllFields();

    if (!errorForForm.value) {
        isLoading.value = true;

        const data: Employee = {
            full_name: inputedFullName.value,
            inn: inputedInn.value,
            address: inputedAddress.value,
            date_birth: inputedDateBirth.value,
            age: 21,
            type_contract: (typeContractList.find((typeContractObj) => {
                return typeContractObj.id === +selectedTypeContract.value
            }))!,
            get type_contract_id () {
                return this.type_contract.id
            },
            gender: (genderList.find((genderObj) => {
                return genderObj.id === +selectedGender.value
            }))!,
            get gender_id () {
                return this.gender.id
            },
            country: (countryList.find((countryObj) => {
                return countryObj.id === +selectedCountry.value
            }))!,
            get country_id () {
                return this.country.id
            },
            position: (positionList.find((positionObj) => {
                return positionObj.id === +selectedPosition.value
            }))!,
            get position_id () {
                return this.position.id
            },
            status: { 
                get tag_id () {
                    return this.tag.id
                },
                tag: (staffTagList.find((staffTagObj) => {
                    return staffTagObj.id === +selectedStaffTag.value
                }))!,
                description: inputedStatusDescription.value,
            },
            passport: inputedPassport.value,
        };

        const promise: Promise<unknown> = new Promise((resolve) => {
            timerId.value = setTimeout(() => {
                resolve(data);
                clearTimeout(Number(timerId.value));
            }, 4000);
        });

        promise.then(() => {
            console.log(data)
            addEmployee(data)
            resetForm();
            isRequestSent.value = true;
            isLoading.value = false;
        });
    }
};

onBeforeUnmount(() => {
    clearTimeout(Number(timerId.value));
});
</script>

<template>
<h2 class="title">{{isRequestSent ? 'Сотрудник добавлен' : 'Добавить сотрудника' }}</h2>
<form class="form" v-if="!isRequestSent" @submit.prevent="submit" method="post">
    <BaseFormFieldWrapper :error="errorForFullName">
        <BaseInput 
            class="form__input" 
            v-model:inputedValue="inputedFullName" 
            :error="errorForFullName" 
            placeholder="Имя" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForInn">
        <BaseInput 
            class="form__input" 
            v-model:inputedValue="inputedInn" 
            :error="errorForInn" 
            placeholder="ИНН" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForAddress">
        <BaseInput 
            class="form__input" 
            v-model:inputedValue="inputedAddress" 
            :error="errorForAddress" 
            placeholder="Адрес" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForDateBirth">
        <BaseInput 
            class="form__input" 
            v-model:inputedValue="inputedDateBirth" 
            :error="errorForDateBirth" 
            placeholder="День рождения" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForPassport">
        <BaseInput 
            class="form__input" 
            v-model:inputedValue="inputedPassport" 
            :error="errorForPassport" 
            placeholder="Паспорт" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForStatusDescription">
        <BaseInput 
            class="form__input" 
            v-model:inputedValue="inputedStatusDescription" 
            :error="errorForStatusDescription" 
            placeholder="Описание сотрудника" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForCountry">
        <BaseSelect 
            defaultValue="Страна"
            :optionsList="countryList"
            v-model:select="selectedCountry"
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForGender">
        <BaseSelect 
            defaultValue="Пол"
            :optionsList="genderList"
            v-model:select="selectedGender"
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForPosition">
        <BaseSelect 
            defaultValue="Должность"
            :optionsList="positionList"
            v-model:select="selectedPosition"
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForTypeContract">
        <BaseSelect 
            defaultValue="Тип договора"
            :optionsList="typeContractList"
            v-model:select="selectedTypeContract"
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="errorForStaffTag">
        <BaseSelect 
            defaultValue="Статус"
            :optionsList="staffTagList"
            v-model:select="selectedStaffTag"
        />
    </BaseFormFieldWrapper>
    <BaseLoader class="form__loader" v-if="isLoading" />
    <button class="form__btn button button_rectangle" v-else type="submit">Добавить</button>
</form>
</template>

<style scoped lang="scss">
.title {
    margin-bottom: 40px;
    color: #ffffff;
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
}

.form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
}

.form__input {
    width: 100%;
}

.form__loader {
    grid-column: auto/span 2;
    height: 60px;
    margin: 0 auto;
    color: #c2ab81;
}

.form__btn {
    grid-column: auto/span 2;
    display: block;
    margin: 0 auto;
    padding: 21px 78px;
}
</style>
