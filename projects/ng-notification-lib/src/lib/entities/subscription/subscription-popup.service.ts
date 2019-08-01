import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.model';

@Injectable()
export class SubscriptionPopupService {
  private ngbModalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private router: Router, private subscriptionService: SubscriptionService) {
    this.ngbModalRef = null;
  }

  open(component: Component, value?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef);
      }

      if (value) {
        this.subscriptionService.find(value).subscribe((subscriptionResponse: HttpResponse<Subscription>) => {
          const subscription: Subscription = subscriptionResponse.body;
          this.ngbModalRef = this.subscriptionModalRef(component, subscription);
          resolve(this.ngbModalRef);
        });
      } else {
        // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.ngbModalRef = this.subscriptionModalRef(component, new Subscription());
          resolve(this.ngbModalRef);
        }, 0);
      }
    });
  }

  subscriptionModalRef(component: Component, subscription: Subscription): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subscription = subscription;
    modalRef.result.then(
      result => {
        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
        this.ngbModalRef = null;
      },
      reason => {
        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
        this.ngbModalRef = null;
      }
    );
    return modalRef;
  }
}
