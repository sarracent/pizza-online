import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPizzaOrder } from 'app/shared/model/pizza-order.model';
import { PizzaOrderService } from './pizza-order.service';

@Component({
    selector: 'jhi-pizza-order-delete-dialog',
    templateUrl: './pizza-order-delete-dialog.component.html'
})
export class PizzaOrderDeleteDialogComponent {
    pizzaOrder: IPizzaOrder;

    constructor(private pizzaOrderService: PizzaOrderService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pizzaOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pizzaOrderListModification',
                content: 'Deleted an pizzaOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pizza-order-delete-popup',
    template: ''
})
export class PizzaOrderDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pizzaOrder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PizzaOrderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.pizzaOrder = pizzaOrder;
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
