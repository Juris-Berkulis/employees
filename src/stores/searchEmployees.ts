import { ref, type Ref } from 'vue';
import { defineStore } from "pinia";

export const useSearchEmployeesStore = defineStore('searchEmployees', () => {
    const searchValue: Ref<string> = ref('');

    return {
        searchValue,
    }
});
