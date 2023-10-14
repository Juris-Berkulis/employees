<script setup lang="ts">
import { ref, type Ref, watch, onBeforeUnmount } from 'vue';
import BaseFormFieldWrapper from '@/components/base/BaseFormFieldWrapper.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';
import { useEmployeesDataStore } from '@/stores/employeesData';
import { useValidation, type Field, type FieldOptions, type OptionsIds } from '@/composables/validation';
import { useDate } from '@/composables/date';
import type { Employee } from '@/data/employees';
import { countryList } from '@/data/country';
import { positionList } from '@/data/position';
import { staffTagList } from '@/data/staffTag';
import { genderList } from '@/data/gender';
import { typeContractList } from '@/data/typeContract';

const { addEmployee } = useEmployeesDataStore();
const { fieldObj, validatedObj, errorForForm } = useValidation();
const { getCurrentAge } = useDate();

const requestCondition: Ref<'pending' | 'fullfiled' | 'rejected'> = ref('pending');
const timerId: Ref<ReturnType<typeof setTimeout> | undefined> = ref();
const isLoading: Ref<boolean> = ref(false);

const checkField = (field: Field) => {
    for (let i = 0; i < validatedObj[field].length; i++) {
        const fieldOptions: FieldOptions = validatedObj[field][i];

        if (!fieldOptions.isValid(fieldObj.value[field].fieldValue)) {
            fieldObj.value[field].fieldError = fieldOptions.errorText; return
        }
    }

    fieldObj.value[field].fieldError = '';
};

const checkAllFields = (): void => {
    for (let field in validatedObj) {
        checkField(field as Field);
    }
};

for (let field in fieldObj.value) {
    watch([() => fieldObj.value[field as Field].fieldValue], () => {
        checkField(field as Field);
    });
};

const resetForm = (): void => {
    for (let field in fieldObj.value) {
        fieldObj.value[field as Field].fieldValue = '';
    }
};

const submit = (): void => {
    checkAllFields();

    if (!errorForForm.value) {
        isLoading.value = true;

        const data: Employee = {
            full_name: fieldObj.value.fullName.fieldValue,
            inn: fieldObj.value.inn.fieldValue,
            address: fieldObj.value.address.fieldValue,
            date_birth: fieldObj.value.dateBirth.fieldValue,
            get age () {
                return getCurrentAge(new Date(this.date_birth))
            },
            type_contract: (typeContractList.find((typeContractObj) => {
                return typeContractObj.id === +fieldObj.value.typeContract.fieldValue
            }))!,
            get type_contract_id () {
                return this.type_contract.id
            },
            gender: (genderList.find((genderObj) => {
                return genderObj.id === +fieldObj.value.gender.fieldValue
            }))!,
            get gender_id () {
                return this.gender.id
            },
            country: (countryList.find((countryObj) => {
                return countryObj.id === +fieldObj.value.country.fieldValue
            }))!,
            get country_id () {
                return this.country.id
            },
            position: (positionList.find((positionObj) => {
                return positionObj.id === +fieldObj.value.position.fieldValue
            }))!,
            get position_id () {
                return this.position.id
            },
            status: { 
                get tag_id () {
                    return this.tag.id
                },
                tag: (staffTagList.find((staffTagObj) => {
                    return staffTagObj.id === +fieldObj.value.staffTag.fieldValue
                }))!,
                description: fieldObj.value.description.fieldValue,
            },
            passport: fieldObj.value.passport.fieldValue,
        };

        const promise: Promise<unknown> = new Promise((resolve, reject) => {
            timerId.value = setTimeout(() => {
                const success: boolean = addEmployee(data);

                if (success) {
                    resolve(data);
                } else {
                    reject('Сотрудник с таким ИНН уже существует!')
                }
            }, 4000);
        });

        promise.then(() => {
            console.log(data);
            resetForm();
            isLoading.value = false;
            requestCondition.value = 'fullfiled';
        }).catch((error) => {
            console.log(error);
            isLoading.value = false;
            requestCondition.value = 'rejected';
            fieldObj.value.inn.fieldError = error;
        });
    }
};

onBeforeUnmount(() => {
    clearTimeout(Number(timerId.value));
});
</script>

<template>
<h2 class="title">{{requestCondition === 'fullfiled' ? 'Сотрудник добавлен' : 'Добавить сотрудника' }}</h2>
<form class="form" v-if="requestCondition !== 'fullfiled'" @submit.prevent="submit" method="post">
    <BaseFormFieldWrapper v-for="fieldValue, field of fieldObj" :key="field" :error="fieldValue.fieldError">
        <BaseInput 
            class="form__input" 
            v-if="fieldValue.placeholder"
            v-model:inputedValue="<string>fieldValue.fieldValue" 
            :class="{form__input_error: fieldValue.fieldError}"
            :placeholder="fieldValue.placeholder" 
        />
        <BaseSelect 
            class="form__select"
            :class="{form__select_error: fieldValue.fieldError}"
            v-else-if="fieldValue.optionsList"
            v-model:select="<OptionsIds>fieldValue.fieldValue"
            :defaultValue="fieldValue.defaultValue!"
            :optionsList="fieldValue.optionsList"
        />
    </BaseFormFieldWrapper>
    <BaseLoader class="form__loader" v-if="isLoading" />
    <button class="form__btn button button_rectangle button_animation" v-else type="submit">Добавить</button>
</form>
</template>

<style scoped lang="scss">
$field-color: var(--white, #ffffff);
$field-bc: rgba(255, 255, 255, 0.1);
$field-trans: all 0.2s linear;
$field-bc-focus: rgba(255, 255, 255, 0.2);
$field-color-error: rgba(236, 63, 63, 1);
$field-bc-error: rgba(236, 63, 63, 0.2);

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

    &:last-child {
        margin-bottom: 0;
    }
}

.form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;

    & > *:first-child {
        grid-column: auto/span 2;
    }

    @media (max-width: $sp-n) {
        & > * {
            grid-column: auto/span 2;
        }
    }
}

.form__input {
    width: 100%;
    color: $field-color;
    background-color: $field-bc;
    transition: $field-trans;

    &::placeholder {
        color: #cccccc;
    }
    
    &:focus {
        background-color: $field-bc-focus;
    }

    &_error:focus, 
    &_error {
        color: $field-color-error;
        background-color: $field-bc-error;

        &::placeholder {
            color: rgba(236, 63, 63, 0.5);
        }
    }
}

.form__select :deep(select) {
    color: $field-color;
    background-color: $field-bc;
    border: none;
    transition: $field-trans;
}

.form__select :deep(select:focus) {
    background-color: $field-bc-focus;
}

.form__select_error :deep(select:focus),
.form__select_error :deep(select) {
    color: $field-color-error;
    background-color: $field-bc-error;
}

.form__select :deep(option) {
    color: var(--black, #041423);
}

.form__loader {
    grid-column: auto/span 2;
    height: 60px;
    margin: 0 auto;
    color: var(--line, #dbe4ed);
}

.form__btn {
    grid-column: auto/span 2;
    margin: 0 auto;
    padding: 20px 50px;
    color: var(--white, #ffffff);
    background-color: var(--light_blue, #00b6ed);
    box-shadow: $bsh-rectangle rgba(0, 182, 237, 0.20);
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
}
</style>
