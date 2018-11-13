import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PizzaCategory } from 'app/shared/model/pizza-category.model';
import { PizzaCategoryService } from './pizza-category.service';
import { PizzaCategoryComponent } from './pizza-category.component';
import { PizzaCategoryDetailComponent } from './pizza-category-detail.component';
import { PizzaCategoryUpdateComponent } from './pizza-category-update.component';
import { PizzaCategoryDeletePopupComponent } from './pizza-category-delete-dialog.component';
import { IPizzaCategory } from 'app/shared/model/pizza-category.model';

@Injectable({ providedIn: 'root' })
export class PizzaCategoryResolve implements Resolve<IPizzaCategory> {
    constructor(private service: PizzaCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PizzaCategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PizzaCategory>) => response.ok),
                map((pizzaCategory: HttpResponse<PizzaCategory>) => pizzaCategory.body)
            );
        }
        return of(new PizzaCategory());
    }
}

export const pizzaCategoryRoute: Routes = [
    {
        path: 'pizza-category',
        component: PizzaCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza-category/:id/view',
        component: PizzaCategoryDetailComponent,
        resolve: {
            pizzaCategory: PizzaCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza-category/new',
        component: PizzaCategoryUpdateComponent,
        resolve: {
            pizzaCategory: PizzaCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pizza-category/:id/edit',
        component: PizzaCategoryUpdateComponent,
        resolve: {
            pizzaCategory: PizzaCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pizzaCategoryPopupRoute: Routes = [
    {
        path: 'pizza-category/:id/delete',
        component: PizzaCategoryDeletePopupComponent,
        resolve: {
            pizzaCategory: PizzaCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appApp.pizzaCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
