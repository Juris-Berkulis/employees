import { computed, toValue, type ComputedRef, type Ref } from "vue";
import type { Employee } from "@/data/employees";
import type { CountryId } from "@/data/country";
import type { GenderId } from "@/data/gender";
import type { PositionId } from "@/data/position";

type Criterion = 'country' | 'gender' | 'position';

type Id<T extends Criterion> = '' | (
    T extends 'country' ? CountryId : 
    T extends 'gender' ? GenderId : 
    T extends 'position' ? PositionId : 
    never
);

export const useFilterEmployeesBySpecificCriterion = (
    employeesList: Employee[] | ComputedRef<Employee[]> | Ref<Employee[]>, 
    filter: Ref<Id<Criterion>>, 
    criterion: Criterion,
) => {
    const employeesListWithFiltered: ComputedRef<Employee[]> = computed(() => {
        if (filter.value !== '') return toValue(toValue(employeesList)).filter((employee) => {
            return employee[criterion].id === filter.value
        })
        else return toValue(toValue(employeesList))
    });

    return employeesListWithFiltered
};
