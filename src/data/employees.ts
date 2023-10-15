import type { Country, CountryId } from "./country";
import type { Gender, GenderId } from "./gender";
import type { Position, PositionId } from "./position";
import type { StaffTag, StaffTagId } from "./staffTag";
import type { TypeContract, TypeContractId } from "./typeContract"

export interface Employee {
    full_name: string, //* - (ФИО) valid
    inn: string, //* - (ИНН) valid
    address: string, //* - (Адрес) valid
    date_birth: string, //* - DD.MM.YYYY (Дата рождения)
    age: number, //* - (Возраст)
    type_contract: TypeContract<TypeContractId>, //* - (Объект тип договора) valid
    type_contract_id: TypeContractId, //* - (ID типа договора) valid
    gender: Gender<GenderId>, //* - (Объект пол) valid
    gender_id: GenderId, //* - (ID пола) valid
    country: Country<CountryId>, //* - (Объект гражданство) valid
    country_id: CountryId, //* - (ID гражданства) valid
    position: Position<PositionId>, //* - (Объект должность) valid
    position_id: PositionId, //* - (ID должности) valid
    status: { //* - (Статус сотрудника) valid 
        tag_id: StaffTagId, //* - (ID тэга сотрудника)
        tag: StaffTag<StaffTagId>, //* - (Объект тэг сотрудников)
        description: string, //* - (Описание статуса)
    },
    passport: string,
};

export const employees: Employee[] = [
    {
        full_name: 'Константинопольский Константин Константинович',
        inn: '123456789011',
        address: 'Санкт-Петербург',
        date_birth: '23.06.2001',
        age: 22,
        type_contract: {
            id: 3,
            title: 'СМЗ',
            slug: 'smz',
        },
        type_contract_id: 1,
        gender: {
            id: 2, 
            title: 'Мужской', 
            slug: 'muzhskoy',
        },
        gender_id: 2,
        country: {
            id: 1, 
            icon: '/images/flags/ru.png', 
            title: 'Россия', 
            slug: 'ru',
        },
        country_id: 1,
        position: {
            id: 1,
            name: 'Промышленный альпинист',
        },
        position_id: 1,
        status: { 
            tag_id: 2,
            tag: {
                id: 2,
                title: 'Критические',
                slug: 'kriticheskie',
                color: '#e52e2e',
            },
            description: 'Истекают все документы',
        },
        passport: '4002123456',
    },
    {
        full_name: 'Иванов Иван Иванович',
        inn: '123456789112',
        address: 'Санкт-Петербург',
        date_birth: '23.06.2001',
        age: 22,
        type_contract: {
            id: 1,
            title: 'ТД',
            slug: 'td',
        },
        type_contract_id: 1,
        gender: {
            id: 2, 
            title: 'Мужской', 
            slug: 'muzhskoy',
        },
        gender_id: 2,
        country: {
            id: 2, 
            icon: '/images/flags/tj.png', 
            title: 'Таджикистан', 
            slug: 'tj',
        },
        country_id: 2,
        position: {
            id: 1,
            name: 'Промышленный альпинист',
        },
        position_id: 1,
        status: { 
            tag_id: 1,
            tag: {
                id: 1,
                title: 'Проблемные',
                slug: 'problemnie',
                color: '#e2bd06',
            },
            description: 'Истекает патент',
        },
        passport: '4002123456',
    },
    {
        full_name: 'Петров Петр Петрович',
        inn: '123456789213',
        address: 'Санкт-Петербург',
        date_birth: '23.06.2001',
        age: 22,
        type_contract: {
            id: 3,
            title: 'СМЗ',
            slug: 'smz',
        },
        type_contract_id: 1,
        gender: {
            id: 2, 
            title: 'Мужской', 
            slug: 'muzhskoy',
        },
        gender_id: 2,
        country: {
            id: 1, 
            icon: '/images/flags/ru.png', 
            title: 'Россия', 
            slug: 'ru',
        },
        country_id: 1,
        position: {
            id: 1,
            name: 'Промышленный альпинист',
        },
        position_id: 1,
        status: { 
            tag_id: 1,
            tag: {
                id: 1,
                title: 'Проблемные',
                slug: 'problemnie',
                color: '#e2bd06',
            },
            description: 'Истекает патент',
        },
        passport: '4002123456',
    },
    {
        full_name: 'Сергеев Сергей Сергеевич',
        inn: '123456789314',
        address: 'Санкт-Петербург',
        date_birth: '23.06.2001',
        age: 22,
        type_contract: {
            id: 2,
            title: 'ГПХ',
            slug: 'gph',
        },
        type_contract_id: 3,
        gender: {
            id: 2, 
            title: 'Мужской', 
            slug: 'muzhskoy',
        },
        gender_id: 2,
        country: {
            id: 2, 
            icon: '/images/flags/tj.png', 
            title: 'Таджикистан', 
            slug: 'tj',
        },
        country_id: 1,
        position: {
            id: 1,
            name: 'Промышленный альпинист',
        },
        position_id: 1,
        status: { 
            tag_id: 3,
            tag: {
                id: 3,
                title: 'Есть замечания',
                slug: 'est_zamechaniya',
                color: '#00b6ed',
            },
            description: 'Пропустил медосмотр',
        },
        passport: '4002123456',
    },
    {
        full_name: 'Федоров Федр Федорович',
        inn: '123456789415',
        address: 'Санкт-Петербург',
        date_birth: '23.06.2001',
        age: 22,
        type_contract: {
            id: 4,
            title: 'Кандидат',
            slug: 'kandidat',
        },
        type_contract_id: 1,
        gender: {
            id: 2, 
            title: 'Мужской', 
            slug: 'muzhskoy',
        },
        gender_id: 2,
        country: {
            id: 1, 
            icon: '/images/flags/ru.png', 
            title: 'Россия', 
            slug: 'ru',
        },
        country_id: 1,
        position: {
            id: 1,
            name: 'Промышленный альпинист',
        },
        position_id: 1,
        status: { 
            tag_id: 4,
            tag: {
                id: 4,
                title: 'Выполнено',
                slug: 'vipolneno',
                color: '#00ae5b',
            },
            description: 'Прошел все процедуры',
        },
        passport: '4002123456',
    },
    {
        full_name: 'Васильева Василиса Васильевна',
        inn: '123456789516',
        address: 'Санкт-Петербург',
        date_birth: '23.06.2001',
        age: 22,
        type_contract: {
            id: 3,
            title: 'СМЗ',
            slug: 'smz',
        },
        type_contract_id: 3,
        gender: {
            id: 1, 
            title: 'Женский', 
            slug: 'zhenskiy',
        },
        gender_id: 1,
        country: {
            id: 3, 
            icon: '/images/flags/uz.png', 
            title: 'Узбекистан', 
            slug: 'uz',
        },
        country_id: 3,
        position: {
            id: 3,
            name: 'Пекарь',
        },
        position_id: 3,
        status: { 
            tag_id: 4,
            tag: {
                id: 4,
                title: 'Выполнено',
                slug: 'vipolneno',
                color: '#00ae5b',
            },
            description: 'Прошел все процедуры',
        },
        passport: '4002123456',
    },
    {
        full_name: 'Александрова Александра Александровна',
        inn: '123456789617',
        address: 'Санкт-Петербург',
        date_birth: '23.06.2001',
        age: 22,
        type_contract: {
            id: 2,
            title: 'ГПХ',
            slug: 'gph',
        },
        type_contract_id: 2,
        gender: {
            id: 1, 
            title: 'Женский', 
            slug: 'zhenskiy',
        },
        gender_id: 1,
        country: {
            id: 1, 
            icon: '/images/flags/ru.png', 
            title: 'Россия', 
            slug: 'ru',
        },
        country_id: 1,
        position: {
            id: 2,
            name: 'Токарь',
        },
        position_id: 2,
        status: { 
            tag_id: 2,
            tag: {
                id: 2,
                title: 'Критические',
                slug: 'kriticheskie',
                color: '#e52e2e',
            },
            description: 'Нет документов',
        },
        passport: '4002123456',
    },
];
