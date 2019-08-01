import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { NotificationService } from './notification.service';
import { INotification } from './notification.model';
import {EventManager} from 'ng-utils';

@Component({
  selector: 'ng-notification-notification-send-dialog',
  templateUrl: './notification-send-dialog.component.html',
  styleUrls: ['../../style/style.css']
})
export class NotificationSendDialogComponent {
  notification: INotification;

  constructor(
    protected notificationService: NotificationService,
    public activeModal: NgbActiveModal,
    protected eventManager: EventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmSend(id: string) {
    console.log('Sending');
    this.notificationService.send(id).subscribe(response => {
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-notification-popup',
  template: ''
})
export class NotificationSendPopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ notification }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NotificationSendDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.notification = notification;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/notification', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/notification', { outlets: { popup: null } }]);
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
