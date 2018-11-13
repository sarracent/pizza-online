import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPizzaOrder } from 'app/shared/model/pizza-order.model';
import { PizzaOrderService } from './pizza-order.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-pizza-order-update',
    templateUrl: './pizza-order-update.component.html'
})
export class PizzaOrderUpdateComponent implements OnInit {
    pizzaOrder: IPizzaOrder;
    isSaving: boolean;

    customers: ICustomer[];
    placedDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pizzaOrderService: PizzaOrderService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pizzaOrder }) => {
            this.pizzaOrder = pizzaOrder;
            this.placedDate = this.pizzaOrder.placedDate != null ? this.pizzaOrder.placedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.pizzaOrder.placedDate = this.placedDate != null ? moment(this.placedDate, DATE_TIME_FORMAT) : null;
        if (this.pizzaOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.pizzaOrderService.update(this.pizzaOrder));
        } else {
            this.subscribeToSaveResponse(this.pizzaOrderService.create(this.pizzaOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPizzaOrder>>) {
        result.subscribe((res: HttpResponse<IPizzaOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
}
