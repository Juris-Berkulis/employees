import { type Ref, computed, type ComputedRef, toValue } from 'vue';
import type { Employee } from '@/data/employees';
import type { FilterTypeContract } from '@/stores/filterTypeContract';
import type { FilterStaffTag } from '@/stores/filterStaffTag';

type Criterion = 'type_contract' | 'status';

type FilterObj<T> = (
    T extends 'type_contract' ? FilterTypeContract : 
    T extends 'status' ?  FilterStaffTag: 
    never
);

export const useFilterEmployeesByMultipleCriteria = <T extends Criterion = Criterion>(
    employeesList: Employee[] | ComputedRef<Employee[]> | Ref<Employee[]>,
    isFilterEnabled: Ref<boolean>, 
    filter: Ref<FilterObj<T>>, criterion: T
) => {
    const employeesListWithFiltered: ComputedRef<Employee[]> = computed(() => {
        if (isFilterEnabled.value) return toValue(toValue(employeesList)).filter((employee) => {
            return filter.value[employee[<'type_contract'>criterion]?.id] 
                || filter.value[employee[<'status'>criterion]['tag']?.id]
        })
        else return toValue(toValue(employeesList))
    });

    return employeesListWithFiltered
};
