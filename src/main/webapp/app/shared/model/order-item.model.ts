import { IPizza } from 'app/shared/model//pizza.model';
import { IPizzaOrder } from 'app/shared/model//pizza-order.model';

export const enum OrderItemStatus {
    AVAILABLE = 'AVAILABLE',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    BACK_ORDER = 'BACK_ORDER'
}

export interface IOrderItem {
    id?: number;
    quantity?: number;
    totalPrice?: number;
    status?: OrderItemStatus;
    pizza?: IPizza;
    order?: IPizzaOrder;
}

export class OrderItem implements IOrderItem {
    constructor(
        public id?: number,
        public quantity?: number,
        public totalPrice?: number,
        public status?: OrderItemStatus,
        public pizza?: IPizza,
        public order?: IPizzaOrder
    ) {}
}
