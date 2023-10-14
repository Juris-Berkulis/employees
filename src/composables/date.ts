export const useDate = () => {
    const getCurrentAge = (dateBirth: Date) => {
        const now: Date = new Date();
        const dateBirthInCurrentYear: Date = new Date(
            now.getFullYear(), dateBirth.getMonth(), dateBirth.getDate()
        );

        const yearsCount = now.getFullYear() - dateBirth.getFullYear();

        console.log(now)
        console.log(dateBirthInCurrentYear)
        console.log(now > dateBirthInCurrentYear)

        return now < dateBirthInCurrentYear ? yearsCount - 1 : yearsCount
    };

    return {
        getCurrentAge,
    }
};
