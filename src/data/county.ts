export type CountryId = 1 | 2 | 3;

interface Russia<T extends string> {
    icon: `/images/flags/${T}.png`,
    title: 'Россия',
    slug: T,
};

interface Tadzhikistan<T extends string> {
    icon: `/images/flags/${T}.png`,
    title: 'Таджикистан',
    slug: T,
};

interface Uzbekistan<T extends string> {
    icon: `/images/flags/${T}.png`,
    title: 'Узбекистан',
    slug: T,
};

export type Country<T extends CountryId = CountryId> = T extends 1 ? ({
    id: T,
} & Russia<'ru'>) : T extends 2 ? ({
    id: T,
} & Tadzhikistan<'tj'>) : T extends 3 ? ({
    id: T,
} & Uzbekistan<'uz'>) : never;

export const country: Country[] = [
    {
        id: 1, 
        icon: '/images/flags/ru.png',
        title: 'Россия',
        slug: 'ru',
    }, 
    {
        id: 2, 
        icon: '/images/flags/tj.png',
        title: 'Таджикистан',
        slug: 'tj',
    }, 
    {
        id: 3, 
        icon: '/images/flags/uz.png',
        title: 'Узбекистан',
        slug: 'uz',
    }, 
];
