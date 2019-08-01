import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChannelService } from './channel.service';
import { IChannel } from './channel.model';
import {EventManager} from 'ng-utils';


@Component({
  selector: 'ng-notification-channel-delete-dialog',
  templateUrl: './channel-delete-dialog.component.html',
  styleUrls: ['../../style/style.css']
})
export class ChannelDeleteDialogComponent {
  channel: IChannel;

  constructor(protected channelService: ChannelService, public activeModal: NgbActiveModal, protected eventManager: EventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(value: string) {
    console.log(value);
    this.channelService.delete(value).subscribe(response => {
      this.eventManager.broadcast({
        name: 'channelListModification',
        content: 'Deleted an channel'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'ng-notification-channel-delete-popup',
  template: ''
})
export class ChannelDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ channel }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ChannelDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.channel = channel;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/channel', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/channel', { outlets: { popup: null } }]);
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
