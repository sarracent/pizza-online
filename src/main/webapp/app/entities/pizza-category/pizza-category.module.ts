import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared';
import {
    PizzaCategoryComponent,
    PizzaCategoryDetailComponent,
    PizzaCategoryUpdateComponent,
    PizzaCategoryDeletePopupComponent,
    PizzaCategoryDeleteDialogComponent,
    pizzaCategoryRoute,
    pizzaCategoryPopupRoute
} from './';

const ENTITY_STATES = [...pizzaCategoryRoute, ...pizzaCategoryPopupRoute];

@NgModule({
    imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PizzaCategoryComponent,
        PizzaCategoryDetailComponent,
        PizzaCategoryUpdateComponent,
        PizzaCategoryDeleteDialogComponent,
        PizzaCategoryDeletePopupComponent
    ],
    entryComponents: [
        PizzaCategoryComponent,
        PizzaCategoryUpdateComponent,
        PizzaCategoryDeleteDialogComponent,
        PizzaCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppPizzaCategoryModule {}
