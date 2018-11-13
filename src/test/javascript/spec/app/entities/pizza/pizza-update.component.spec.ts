/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { PizzaUpdateComponent } from 'app/entities/pizza/pizza-update.component';
import { PizzaService } from 'app/entities/pizza/pizza.service';
import { Pizza } from 'app/shared/model/pizza.model';

describe('Component Tests', () => {
    describe('Pizza Management Update Component', () => {
        let comp: PizzaUpdateComponent;
        let fixture: ComponentFixture<PizzaUpdateComponent>;
        let service: PizzaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [PizzaUpdateComponent]
            })
                .overrideTemplate(PizzaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PizzaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PizzaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Pizza(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pizza = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Pizza();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pizza = entity;
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
