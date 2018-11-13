/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppTestModule } from '../../../test.module';
import { PizzaDetailComponent } from 'app/entities/pizza/pizza-detail.component';
import { Pizza } from 'app/shared/model/pizza.model';

describe('Component Tests', () => {
    describe('Pizza Management Detail Component', () => {
        let comp: PizzaDetailComponent;
        let fixture: ComponentFixture<PizzaDetailComponent>;
        const route = ({ data: of({ pizza: new Pizza(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [PizzaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PizzaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PizzaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pizza).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
