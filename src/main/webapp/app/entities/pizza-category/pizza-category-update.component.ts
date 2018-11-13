import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPizzaCategory } from 'app/shared/model/pizza-category.model';
import { PizzaCategoryService } from './pizza-category.service';

@Component({
    selector: 'jhi-pizza-category-update',
    templateUrl: './pizza-category-update.component.html'
})
export class PizzaCategoryUpdateComponent implements OnInit {
    pizzaCategory: IPizzaCategory;
    isSaving: boolean;

    constructor(private pizzaCategoryService: PizzaCategoryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pizzaCategory }) => {
            this.pizzaCategory = pizzaCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pizzaCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.pizzaCategoryService.update(this.pizzaCategory));
        } else {
            this.subscribeToSaveResponse(this.pizzaCategoryService.create(this.pizzaCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPizzaCategory>>) {
        result.subscribe((res: HttpResponse<IPizzaCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
