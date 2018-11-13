/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { PizzaCategoryUpdateComponent } from 'app/entities/pizza-category/pizza-category-update.component';
import { PizzaCategoryService } from 'app/entities/pizza-category/pizza-category.service';
import { PizzaCategory } from 'app/shared/model/pizza-category.model';

describe('Component Tests', () => {
    describe('PizzaCategory Management Update Component', () => {
        let comp: PizzaCategoryUpdateComponent;
        let fixture: ComponentFixture<PizzaCategoryUpdateComponent>;
        let service: PizzaCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [PizzaCategoryUpdateComponent]
            })
                .overrideTemplate(PizzaCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PizzaCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PizzaCategoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PizzaCategory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pizzaCategory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PizzaCategory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.pizzaCategory = entity;
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
