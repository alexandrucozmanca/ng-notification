import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { SubscriptionService } from './subscription.service';
import { ISubscription } from './subscription.model';
import {EventManager} from 'ng-utils';

@Component({
  selector: 'ng-notification-subscription-delete-dialog',
  templateUrl: './subscription-delete-dialog.component.html',
  styleUrls: ['../../style/style.css']
})
export class SubscriptionDeleteDialogComponent {
  subscription: ISubscription;

  constructor(
    protected subscriptionService: SubscriptionService,
    public activeModal: NgbActiveModal,
    protected eventManager: EventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(value: string) {
    console.log(value);
    this.subscriptionService.delete(value).subscribe(response => {
      this.eventManager.broadcast({
        name: 'subscriptionListModification',
        content: 'Deleted an subscription'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-subscription-delete-popup',
  template: ''
})
export class SubscriptionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subscription }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SubscriptionDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.subscription = subscription;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/subscription', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/subscription', { outlets: { popup: null } }]);
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
