import { IPizzaCategory } from 'app/shared/model//pizza-category.model';

export const enum PizzaType {
    NORMAL = 'NORMAL',
    FAMILY = 'FAMILY'
}

export interface IPizza {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    pizzatype?: PizzaType;
    imageContentType?: string;
    image?: any;
    pizzaCategory?: IPizzaCategory;
}

export class Pizza implements IPizza {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public price?: number,
        public pizzatype?: PizzaType,
        public imageContentType?: string,
        public image?: any,
        public pizzaCategory?: IPizzaCategory
    ) {}
}
