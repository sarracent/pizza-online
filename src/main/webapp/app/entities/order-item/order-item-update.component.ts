import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderItem } from 'app/shared/model/order-item.model';
import { OrderItemService } from './order-item.service';
import { IPizza } from 'app/shared/model/pizza.model';
import { PizzaService } from 'app/entities/pizza';
import { IPizzaOrder } from 'app/shared/model/pizza-order.model';
import { PizzaOrderService } from 'app/entities/pizza-order';

@Component({
    selector: 'jhi-order-item-update',
    templateUrl: './order-item-update.component.html'
})
export class OrderItemUpdateComponent implements OnInit {
    orderItem: IOrderItem;
    isSaving: boolean;

    pizzas: IPizza[];

    pizzaorders: IPizzaOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderItemService: OrderItemService,
        private pizzaService: PizzaService,
        private pizzaOrderService: PizzaOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderItem }) => {
            this.orderItem = orderItem;
        });
        this.pizzaService.query().subscribe(
            (res: HttpResponse<IPizza[]>) => {
                this.pizzas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pizzaOrderService.query().subscribe(
            (res: HttpResponse<IPizzaOrder[]>) => {
                this.pizzaorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderItem.id !== undefined) {
            this.subscribeToSaveResponse(this.orderItemService.update(this.orderItem));
        } else {
            this.subscribeToSaveResponse(this.orderItemService.create(this.orderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItem>>) {
        result.subscribe((res: HttpResponse<IOrderItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPizzaById(index: number, item: IPizza) {
        return item.id;
    }

    trackPizzaOrderById(index: number, item: IPizzaOrder) {
        return item.id;
    }
}
