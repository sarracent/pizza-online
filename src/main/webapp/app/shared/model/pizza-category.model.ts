import { IPizza } from 'app/shared/model//pizza.model';

export interface IPizzaCategory {
    id?: number;
    name?: string;
    description?: string;
    pizzas?: IPizza[];
}

export class PizzaCategory implements IPizzaCategory {
    constructor(public id?: number, public name?: string, public description?: string, public pizzas?: IPizza[]) {}
}
