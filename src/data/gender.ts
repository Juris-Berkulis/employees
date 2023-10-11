export type GenderId = 1 | 2;

interface Woman {
    title: 'Женский',
    slug: 'zhenskiy',
};

interface Man {
    title: 'Мужской',
    slug: 'muzhskoy',
};

export type Gender<T extends GenderId = GenderId> = T extends 1 ? ({
    id: T,
} & Woman) : ({
    id: T,
} & Man);

export const gender: Gender[] = [
    {
        id: 1,
        title: 'Женский',
        slug: 'zhenskiy',
    },
    {
        id: 2,
        title: 'Мужской',
        slug: 'muzhskoy',
    },
];
