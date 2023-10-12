export type PositionId = 1 | 2 | 3;

export type Position<T extends PositionId = PositionId> = T extends 1 ? {
    id: T,
    name: 'Промышленный альпинист',
} : T extends 2 ? {
    id: T,
    name: 'Токарь', 
} : T extends 3 ? {
    id: T,
    name: 'Пекарь',
} : never;

export const positionList: Position[] = [
    {
        id: 1,
        name: 'Промышленный альпинист', 
    },
    {
        id: 2,
        name: 'Токарь', 
    },
    {
        id: 3,
        name: 'Пекарь', 
    },
];
