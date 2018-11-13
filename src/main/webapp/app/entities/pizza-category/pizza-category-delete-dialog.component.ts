import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPizzaCategory } from 'app/shared/model/pizza-category.model';
import { PizzaCategoryService } from './pizza-category.service';

@Component({
    selector: 'jhi-pizza-category-delete-dialog',
    templateUrl: './pizza-category-delete-dialog.component.html'
})
export class PizzaCategoryDeleteDialogComponent {
    pizzaCategory: IPizzaCategory;

    constructor(
        private pizzaCategoryService: PizzaCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pizzaCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pizzaCategoryListModification',
                content: 'Deleted an pizzaCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pizza-category-delete-popup',
    template: ''
})
export class PizzaCategoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pizzaCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PizzaCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pizzaCategory = pizzaCategory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
