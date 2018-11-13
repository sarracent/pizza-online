import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PizzaOrder } from 'app/shared/model/pizza-order.model';
import { PizzaOrderService } from './pizza-order.service';
import { PizzaOrderComponent } from './pizza-order.component';
import { PizzaOrderDetailComponent } from './pizza-order-detail.component';
import { PizzaOrderUpdateComponent } from './pizza-order-update.component';
import { PizzaOrderDeletePopupComponent } from './pizza-order-delete-dialog.component';
import { IPizzaOrder } from 'app/shared/model/pizza-order.model';

@Injectable({ providedIn: 'root' })
export class PizzaOrderResolve implements Resolve<IPizzaOrder> {
    constructor(private service: PizzaOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PizzaOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PizzaOrder>) => response.ok),
                map((pizzaOrder: HttpResponse<PizzaOrder>) => pizzaOrder.body)
            );
        }
        return of(new PizzaOrder());
    }
}

export const pizzaOrderRoute: Routes = [
    {
        path: 'pizza-order',
        component: PizzaOrderComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'appApp.pizzaOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza-order/:id/view',
        component: PizzaOrderDetailComponent,
        resolve: {
            pizzaOrder: PizzaOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza-order/new',
        component: PizzaOrderUpdateComponent,
        resolve: {
            pizzaOrder: PizzaOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza-order/:id/edit',
        component: PizzaOrderUpdateComponent,
        resolve: {
            pizzaOrder: PizzaOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pizzaOrderPopupRoute: Routes = [
    {
        path: 'pizza-order/:id/delete',
        component: PizzaOrderDeletePopupComponent,
        resolve: {
            pizzaOrder: PizzaOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
