interface UseValidation {
    [key: string]: (value: any, ...args: any) => boolean;
};

export const useValidation = (): UseValidation => {
    const requiredField = (value: string | boolean): boolean => {
        return !!value
    };

    const regExpMatching = (value: string, regExp: RegExp): boolean => {
        return regExp.test(value)
    };

    const minLength = (value: string, minStrLength: number): boolean => {
        return value.length >= minStrLength
    };

    return {
        requiredField, 
        regExpMatching, 
        minLength, 
    }
};
