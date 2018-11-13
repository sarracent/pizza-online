/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { PizzaOrderUpdateComponent } from 'app/entities/pizza-order/pizza-order-update.component';
import { PizzaOrderService } from 'app/entities/pizza-order/pizza-order.service';
import { PizzaOrder } from 'app/shared/model/pizza-order.model';

describe('Component Tests', () => {
    describe('PizzaOrder Management Update Component', () => {
        let comp: PizzaOrderUpdateComponent;
        let fixture: ComponentFixture<PizzaOrderUpdateComponent>;
        let service: PizzaOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [PizzaOrderUpdateComponent]
            })
                .overrideTemplate(PizzaOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PizzaOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PizzaOrderService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PizzaOrder(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pizzaOrder = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PizzaOrder();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pizzaOrder = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
