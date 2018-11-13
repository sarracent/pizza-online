import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPizzaOrder } from 'app/shared/model/pizza-order.model';

@Component({
    selector: 'jhi-pizza-order-detail',
    templateUrl: './pizza-order-detail.component.html'
})
export class PizzaOrderDetailComponent implements OnInit {
    pizzaOrder: IPizzaOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pizzaOrder }) => {
            this.pizzaOrder = pizzaOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
