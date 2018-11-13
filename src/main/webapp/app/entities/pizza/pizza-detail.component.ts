import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPizza } from 'app/shared/model/pizza.model';

@Component({
    selector: 'jhi-pizza-detail',
    templateUrl: './pizza-detail.component.html'
})
export class PizzaDetailComponent implements OnInit {
    pizza: IPizza;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pizza }) => {
            this.pizza = pizza;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
