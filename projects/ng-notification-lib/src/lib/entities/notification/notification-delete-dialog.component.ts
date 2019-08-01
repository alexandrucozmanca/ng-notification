import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { NotificationService } from './notification.service';
import { INotification } from './notification.model';
import {EventManager} from 'ng-utils';

@Component({
  selector: 'ng-notification-notification-delete-dialog',
  templateUrl: './notification-delete-dialog.component.html',
  styleUrls: ['../../style/style.css']
})
export class NotificationDeleteDialogComponent {
  notification: INotification;

  constructor(
    protected notificationService: NotificationService,
    public activeModal: NgbActiveModal,
    protected eventManager: EventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.notificationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'notificationListModification',
        content: 'Deleted an notification'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-notification-delete-popup',
  template: ''
})
export class NotificationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ notification }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NotificationDeleteDialogComponent as Component, {
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
