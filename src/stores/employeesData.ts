import { ref, type Ref, watchEffect } from 'vue';
import { defineStore } from "pinia";
import { employees, type Employee } from "@/data/employees";

export const useEmployeesDataStore = defineStore('employeesData', () => {
    const employeesDataKey: string = 'employeesData';
    const employeesDataFromLocalStorage: string | null = localStorage.getItem(employeesDataKey);
    const employeesData: Ref<Employee[]> = ref(
        employeesDataFromLocalStorage ? JSON.parse(employeesDataFromLocalStorage) : employees
    );

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

    watchEffect(() => {
        localStorage.setItem(employeesDataKey, JSON.stringify(employeesData.value));
    });

    return {
        employeesData,
        addEmployee,
    }
});
