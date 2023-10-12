export type TypeContractId = 1 | 2 | 3 | 4;

export type TypeContract<T extends TypeContractId = TypeContractId> = T extends 1 ? {
    id: T,
    title: 'ТД',
    slug: 'td',
} : T extends 2 ? {
    id: T,
    title: 'ГПХ',
    slug: 'gph',
} : T extends 3 ? {
    id: T,
    title: 'СМЗ',
    slug: 'smz',
} : T extends 4 ? {
    id: T,
    title: 'Кандидат',
    slug: 'kandidat',
} : never;

export const typeContractList: TypeContract[] = [
    {
        id: 1,
        title: 'ТД',
        slug: 'td',
    },
    {
        id: 2,
        title: 'ГПХ',
        slug: 'gph',
    },
    {
        id: 3,
        title: 'СМЗ',
        slug: 'smz',
    },
    {
        id: 4,
        title: 'Кандидат',
        slug: 'kandidat',
    },
];
