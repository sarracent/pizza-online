import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';
import { IPizzaOrder } from 'app/shared/model/pizza-order.model';
import { PizzaOrderService } from 'app/entities/pizza-order';

@Component({
    selector: 'jhi-invoice-update',
    templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
    invoice: IInvoice;
    isSaving: boolean;

    pizzaorders: IPizzaOrder[];
    date: string;
    paymentDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private invoiceService: InvoiceService,
        private pizzaOrderService: PizzaOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ invoice }) => {
            this.invoice = invoice;
            this.date = this.invoice.date != null ? this.invoice.date.format(DATE_TIME_FORMAT) : null;
            this.paymentDate = this.invoice.paymentDate != null ? this.invoice.paymentDate.format(DATE_TIME_FORMAT) : null;
        });
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
        this.invoice.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        this.invoice.paymentDate = this.paymentDate != null ? moment(this.paymentDate, DATE_TIME_FORMAT) : null;
        if (this.invoice.id !== undefined) {
            this.subscribeToSaveResponse(this.invoiceService.update(this.invoice));
        } else {
            this.subscribeToSaveResponse(this.invoiceService.create(this.invoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>) {
        result.subscribe((res: HttpResponse<IInvoice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPizzaOrderById(index: number, item: IPizzaOrder) {
        return item.id;
    }
}
