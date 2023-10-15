export const useCheckType = () => {
    const valueShouldBeNever = (value: never): never => {
        throw new Error(`Необработанное значение: ${value}`); 
    };

    return {
        valueShouldBeNever,
    }
};
