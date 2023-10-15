import { type Ref, computed, type ComputedRef, toValue } from 'vue';
import type { Employee } from '@/data/employees';
import type { FilterTypeContract } from '@/stores/filterTypeContract';
import type { FilterStaffTag } from '@/stores/filterStaffTag';
import { useCheckType } from '@/composables/checkType';

const { valueShouldBeNever } = useCheckType();

type Criterion = 'type_contract' | 'status';

type FilterObj<T extends Criterion> = (
    T extends 'type_contract' ? FilterTypeContract : 
    T extends 'status' ?  FilterStaffTag : 
    never
);

export const useFilterEmployeesByMultipleCriteria = (
    employeesList: Employee[] | ComputedRef<Employee[]> | Ref<Employee[]>,
    isFilterEnabled: Ref<boolean>, 
    filter: Ref<FilterObj<Criterion>>, 
    criterion: Criterion,
) => {
    const employeesListWithFiltered: ComputedRef<Employee[]> = computed(() => {
        const employeesListAsValue: Employee[] = toValue(toValue(employeesList));

        if (isFilterEnabled.value) return employeesListAsValue.filter((employee) => {
            switch (criterion) {
                case 'type_contract': return filter.value[employee[criterion].id]
                case 'status': return filter.value[employee[criterion]['tag']?.id]
                default: valueShouldBeNever(criterion);
            }
        })
        else return employeesListAsValue
    });

    return employeesListWithFiltered
};
