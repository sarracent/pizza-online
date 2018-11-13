import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPizzaCategory } from 'app/shared/model/pizza-category.model';
import { Principal } from 'app/core';
import { PizzaCategoryService } from './pizza-category.service';

@Component({
    selector: 'jhi-pizza-category',
    templateUrl: './pizza-category.component.html'
})
export class PizzaCategoryComponent implements OnInit, OnDestroy {
    pizzaCategories: IPizzaCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pizzaCategoryService: PizzaCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.pizzaCategoryService.query().subscribe(
            (res: HttpResponse<IPizzaCategory[]>) => {
                this.pizzaCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPizzaCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPizzaCategory) {
        return item.id;
    }

    registerChangeInPizzaCategories() {
        this.eventSubscriber = this.eventManager.subscribe('pizzaCategoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
