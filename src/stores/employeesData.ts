import { ref, type Ref } from 'vue';
import { defineStore } from "pinia";
import { employees, type Employee } from "@/data/employees";

export const useEmployeesDataStore = defineStore('employeesData', () => {
    const employeesData: Ref<Employee[]> = ref(employees);

    const addEmployee = (newEmployee: Employee): boolean => {
        const isInnFound = employeesData.value.find((employee) => {
            return employee.inn === newEmployee.inn
        });

        if (isInnFound) return false
        else {
            employeesData.value.unshift(newEmployee);
            return true
        }
    };

    return {
        employeesData,
        addEmployee,
    }
});
