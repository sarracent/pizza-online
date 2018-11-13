import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared';
import {
    OrderItemComponent,
    OrderItemDetailComponent,
    OrderItemUpdateComponent,
    OrderItemDeletePopupComponent,
    OrderItemDeleteDialogComponent,
    orderItemRoute,
    orderItemPopupRoute
} from './';

const ENTITY_STATES = [...orderItemRoute, ...orderItemPopupRoute];

@NgModule({
    imports: [AppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderItemComponent,
        OrderItemDetailComponent,
        OrderItemUpdateComponent,
        OrderItemDeleteDialogComponent,
        OrderItemDeletePopupComponent
    ],
    entryComponents: [OrderItemComponent, OrderItemUpdateComponent, OrderItemDeleteDialogComponent, OrderItemDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppOrderItemModule {}
