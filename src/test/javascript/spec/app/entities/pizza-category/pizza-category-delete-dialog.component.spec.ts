/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AppTestModule } from '../../../test.module';
import { PizzaCategoryDeleteDialogComponent } from 'app/entities/pizza-category/pizza-category-delete-dialog.component';
import { PizzaCategoryService } from 'app/entities/pizza-category/pizza-category.service';

describe('Component Tests', () => {
    describe('PizzaCategory Management Delete Component', () => {
        let comp: PizzaCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<PizzaCategoryDeleteDialogComponent>;
        let service: PizzaCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [PizzaCategoryDeleteDialogComponent]
            })
                .overrideTemplate(PizzaCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PizzaCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PizzaCategoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
