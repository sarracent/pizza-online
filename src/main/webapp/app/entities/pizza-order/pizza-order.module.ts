import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared';
import {
    PizzaOrderComponent,
    PizzaOrderDetailComponent,
    PizzaOrderUpdateComponent,
    PizzaOrderDeletePopupComponent,
    PizzaOrderDeleteDialogComponent,
    pizzaOrderRoute,
    pizzaOrderPopupRoute
} from './';

const ENTITY_STATES = [...pizzaOrderRoute, ...pizzaOrderPopupRoute];

@NgModule({
    imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PizzaOrderComponent,
        PizzaOrderDetailComponent,
        PizzaOrderUpdateComponent,
        PizzaOrderDeleteDialogComponent,
        PizzaOrderDeletePopupComponent
    ],
    entryComponents: [PizzaOrderComponent, PizzaOrderUpdateComponent, PizzaOrderDeleteDialogComponent, PizzaOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppPizzaOrderModule {}
