import { IUser } from 'app/core/user/user.model';
import { IPizzaOrder } from 'app/shared/model//pizza-order.model';

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export interface ICustomer {
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    email?: string;
    phone?: string;
    addressLine1?: string;
    city?: string;
    country?: string;
    user?: IUser;
    orders?: IPizzaOrder[];
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public gender?: Gender,
        public email?: string,
        public phone?: string,
        public addressLine1?: string,
        public city?: string,
        public country?: string,
        public user?: IUser,
        public orders?: IPizzaOrder[]
    ) {}
}
