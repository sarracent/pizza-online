import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPizza } from 'app/shared/model/pizza.model';
import { PizzaService } from './pizza.service';
import { IPizzaCategory } from 'app/shared/model/pizza-category.model';
import { PizzaCategoryService } from 'app/entities/pizza-category';

@Component({
    selector: 'jhi-pizza-update',
    templateUrl: './pizza-update.component.html'
})
export class PizzaUpdateComponent implements OnInit {
    pizza: IPizza;
    isSaving: boolean;

    pizzacategories: IPizzaCategory[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private pizzaService: PizzaService,
        private pizzaCategoryService: PizzaCategoryService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pizza }) => {
            this.pizza = pizza;
        });
        this.pizzaCategoryService.query().subscribe(
            (res: HttpResponse<IPizzaCategory[]>) => {
                this.pizzacategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.pizza, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pizza.id !== undefined) {
            this.subscribeToSaveResponse(this.pizzaService.update(this.pizza));
        } else {
            this.subscribeToSaveResponse(this.pizzaService.create(this.pizza));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPizza>>) {
        result.subscribe((res: HttpResponse<IPizza>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPizzaCategoryById(index: number, item: IPizzaCategory) {
        return item.id;
    }
}
