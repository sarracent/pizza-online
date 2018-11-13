/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { PizzaOrderDetailComponent } from 'app/entities/pizza-order/pizza-order-detail.component';
import { PizzaOrder } from 'app/shared/model/pizza-order.model';

describe('Component Tests', () => {
    describe('PizzaOrder Management Detail Component', () => {
        let comp: PizzaOrderDetailComponent;
        let fixture: ComponentFixture<PizzaOrderDetailComponent>;
        const route = ({ data: of({ pizzaOrder: new PizzaOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [PizzaOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PizzaOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PizzaOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pizzaOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
