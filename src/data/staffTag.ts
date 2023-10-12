export type StaffTagId = 1 | 2 | 3 | 4;

export type StaffTag<T extends StaffTagId = StaffTagId> = T extends 1 ? {
    id: T,
    title: 'Проблемные',
    slug: 'problemnie',
    color: '#e2bd06',
} : T extends 2 ? {
    id: T,
    title: 'Критические',
    slug: 'kriticheskie',
    color: '#e52e2e',
} : T extends 3 ? {
    id: T,
    title: 'Есть замечания',
    slug: 'est_zamechaniya',
    color: '#00b6ed',
} : T extends 4 ? {
    id: T,
    title: 'Выполнено',
    slug: 'vipolneno',
    color: '#00ae5b',
} : never;

export const staffTagList: StaffTag[] = [
    {
        id: 1,
        title: 'Проблемные',
        slug: 'problemnie',
        color: '#e2bd06',
    },
    {
        id: 2,
        title: 'Критические',
        slug: 'kriticheskie',
        color: '#e52e2e',
    },
    {
        id: 3,
        title: 'Есть замечания',
        slug: 'est_zamechaniya',
        color: '#00b6ed',
    },
    {
        id: 4,
        title: 'Выполнено',
        slug: 'vipolneno',
        color: '#00ae5b',
    },
];
