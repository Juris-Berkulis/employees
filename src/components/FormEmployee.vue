<script setup lang="ts">
import { ref, type Ref, watch, onBeforeUnmount } from 'vue';
import BaseFormFieldWrapper from '@/components/base/BaseFormFieldWrapper.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';
import { useEmployeesDataStore } from '@/stores/employeesData';
import { useValidation, type Field, type FieldOptions } from '@/composables/validation';
import type { Employee } from '@/data/employees';
import { countryList } from '@/data/country';
import { positionList } from '@/data/position';
import { staffTagList } from '@/data/staffTag';
import { genderList } from '@/data/gender';
import { typeContractList } from '@/data/typeContract';

const {
    addEmployee,
} = useEmployeesDataStore();

const { 
    fieldObj,
    validatedObj,
    errorForForm, 
} = useValidation();

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
            age: 21,
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
    <BaseFormFieldWrapper :error="fieldObj.fullName.fieldError">
        <BaseInput 
            class="form__input" 
            :class="{form__input_error: fieldObj.fullName.fieldError}"
            v-model:inputedValue="fieldObj.fullName.fieldValue" 
            placeholder="Имя" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.inn.fieldError">
        <BaseInput 
            class="form__input" 
            :class="{form__input_error: fieldObj.inn.fieldError}"
            v-model:inputedValue="fieldObj.inn.fieldValue" 
            placeholder="ИНН" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.address.fieldError">
        <BaseInput 
            class="form__input" 
            :class="{form__input_error: fieldObj.address.fieldError}"
            v-model:inputedValue="fieldObj.address.fieldValue" 
            placeholder="Адрес" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.dateBirth.fieldError">
        <BaseInput 
            class="form__input" 
            :class="{form__input_error: fieldObj.dateBirth.fieldError}"
            v-model:inputedValue="fieldObj.dateBirth.fieldValue" 
            placeholder="День рождения" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.passport.fieldError">
        <BaseInput 
            class="form__input" 
            :class="{form__input_error: fieldObj.passport.fieldError}"
            v-model:inputedValue="fieldObj.passport.fieldValue" 
            placeholder="Паспорт" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.description.fieldError">
        <BaseInput 
            class="form__input" 
            :class="{form__input_error: fieldObj.description.fieldError}"
            v-model:inputedValue="fieldObj.description.fieldValue" 
            placeholder="Описание сотрудника" 
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.country.fieldError">
        <BaseSelect 
            class="form__select"
            :class="{form__select_error: fieldObj.country.fieldError}"
            defaultValue="Страна"
            :optionsList="countryList"
            v-model:select="fieldObj.country.fieldValue"
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.gender.fieldError">
        <BaseSelect 
            class="form__select"
            :class="{form__select_error: fieldObj.gender.fieldError}"
            defaultValue="Пол"
            :optionsList="genderList"
            v-model:select="fieldObj.gender.fieldValue"
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.position.fieldError">
        <BaseSelect 
            class="form__select"
            :class="{form__select_error: fieldObj.position.fieldError}"
            defaultValue="Должность"
            :optionsList="positionList"
            v-model:select="fieldObj.position.fieldValue"
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.typeContract.fieldError">
        <BaseSelect 
            class="form__select"
            :class="{form__select_error: fieldObj.typeContract.fieldError}"
            defaultValue="Тип договора"
            :optionsList="typeContractList"
            v-model:select="fieldObj.typeContract.fieldValue"
        />
    </BaseFormFieldWrapper>
    <BaseFormFieldWrapper :error="fieldObj.staffTag.fieldError">
        <BaseSelect 
            class="form__select"
            :class="{form__select_error: fieldObj.staffTag.fieldError}"
            defaultValue="Статус"
            :optionsList="staffTagList"
            v-model:select="fieldObj.staffTag.fieldValue"
        />
    </BaseFormFieldWrapper>
    <BaseLoader class="form__loader" v-if="isLoading" />
    <button class="form__btn button button_rectangle" v-else type="submit">Добавить</button>
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
}

.form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
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
    display: block;
    margin: 0 auto;
    padding: 21px 78px;
}
</style>
