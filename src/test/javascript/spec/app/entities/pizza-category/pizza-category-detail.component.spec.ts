/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { PizzaCategoryDetailComponent } from 'app/entities/pizza-category/pizza-category-detail.component';
import { PizzaCategory } from 'app/shared/model/pizza-category.model';

describe('Component Tests', () => {
    describe('PizzaCategory Management Detail Component', () => {
        let comp: PizzaCategoryDetailComponent;
        let fixture: ComponentFixture<PizzaCategoryDetailComponent>;
        const route = ({ data: of({ pizzaCategory: new PizzaCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [PizzaCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PizzaCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PizzaCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pizzaCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
