import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pizza } from 'app/shared/model/pizza.model';
import { PizzaService } from './pizza.service';
import { PizzaComponent } from './pizza.component';
import { PizzaDetailComponent } from './pizza-detail.component';
import { PizzaUpdateComponent } from './pizza-update.component';
import { PizzaDeletePopupComponent } from './pizza-delete-dialog.component';
import { IPizza } from 'app/shared/model/pizza.model';

@Injectable({ providedIn: 'root' })
export class PizzaResolve implements Resolve<IPizza> {
    constructor(private service: PizzaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pizza> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Pizza>) => response.ok),
                map((pizza: HttpResponse<Pizza>) => pizza.body)
            );
        }
        return of(new Pizza());
    }
}

export const pizzaRoute: Routes = [
    {
        path: 'pizza',
        component: PizzaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'appApp.pizza.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza/:id/view',
        component: PizzaDetailComponent,
        resolve: {
            pizza: PizzaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizza.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza/new',
        component: PizzaUpdateComponent,
        resolve: {
            pizza: PizzaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizza.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza/:id/edit',
        component: PizzaUpdateComponent,
        resolve: {
            pizza: PizzaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizza.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pizzaPopupRoute: Routes = [
    {
        path: 'pizza/:id/delete',
        component: PizzaDeletePopupComponent,
        resolve: {
            pizza: PizzaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizza.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
