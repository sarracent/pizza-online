/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppTestModule } from '../../../test.module';
import { PizzaCategoryComponent } from 'app/entities/pizza-category/pizza-category.component';
import { PizzaCategoryService } from 'app/entities/pizza-category/pizza-category.service';
import { PizzaCategory } from 'app/shared/model/pizza-category.model';

describe('Component Tests', () => {
    describe('PizzaCategory Management Component', () => {
        let comp: PizzaCategoryComponent;
        let fixture: ComponentFixture<PizzaCategoryComponent>;
        let service: PizzaCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [PizzaCategoryComponent],
                providers: []
            })
                .overrideTemplate(PizzaCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PizzaCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PizzaCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PizzaCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pizzaCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
