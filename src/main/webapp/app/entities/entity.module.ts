import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppPizzaModule } from './pizza/pizza.module';
import { AppPizzaCategoryModule } from './pizza-category/pizza-category.module';
import { AppCustomerModule } from './customer/customer.module';
import { AppPizzaOrderModule } from './pizza-order/pizza-order.module';
import { AppOrderItemModule } from './order-item/order-item.module';
import { AppInvoiceModule } from './invoice/invoice.module';
import { AppShipmentModule } from './shipment/shipment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        AppPizzaModule,
        AppPizzaCategoryModule,
        AppCustomerModule,
        AppPizzaOrderModule,
        AppOrderItemModule,
        AppInvoiceModule,
        AppShipmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppEntityModule {}
