import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared';
import {
    PizzaComponent,
    PizzaDetailComponent,
    PizzaUpdateComponent,
    PizzaDeletePopupComponent,
    PizzaDeleteDialogComponent,
    pizzaRoute,
    pizzaPopupRoute
} from './';

const ENTITY_STATES = [...pizzaRoute, ...pizzaPopupRoute];

@NgModule({
    imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PizzaComponent, PizzaDetailComponent, PizzaUpdateComponent, PizzaDeleteDialogComponent, PizzaDeletePopupComponent],
    entryComponents: [PizzaComponent, PizzaUpdateComponent, PizzaDeleteDialogComponent, PizzaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppPizzaModule {}
