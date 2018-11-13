import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPizzaCategory } from 'app/shared/model/pizza-category.model';

@Component({
    selector: 'jhi-pizza-category-detail',
    templateUrl: './pizza-category-detail.component.html'
})
export class PizzaCategoryDetailComponent implements OnInit {
    pizzaCategory: IPizzaCategory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pizzaCategory }) => {
            this.pizzaCategory = pizzaCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
