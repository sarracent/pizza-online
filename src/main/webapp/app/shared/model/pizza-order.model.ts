import { Moment } from 'moment';
import { IOrderItem } from 'app/shared/model//order-item.model';
import { IInvoice } from 'app/shared/model//invoice.model';
import { ICustomer } from 'app/shared/model//customer.model';

export const enum OrderStatus {
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED'
}

export interface IPizzaOrder {
    id?: number;
    placedDate?: Moment;
    status?: OrderStatus;
    code?: string;
    orderItems?: IOrderItem[];
    invoices?: IInvoice[];
    customer?: ICustomer;
}

export class PizzaOrder implements IPizzaOrder {
    constructor(
        public id?: number,
        public placedDate?: Moment,
        public status?: OrderStatus,
        public code?: string,
        public orderItems?: IOrderItem[],
        public invoices?: IInvoice[],
        public customer?: ICustomer
    ) {}
}
