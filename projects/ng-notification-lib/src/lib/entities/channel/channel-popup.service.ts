import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ChannelService } from './channel.service';
import { Channel } from './channel.model';

@Injectable()
export class ChannelPopupService {
  private ngbModalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private router: Router, private channelService: ChannelService) {
    this.ngbModalRef = null;
  }

  open(component: Component, value?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef);
      }

      if (value) {
        this.channelService.find(value).subscribe((channelResponse: HttpResponse<Channel>) => {
          const channel: Channel = channelResponse.body;
          this.ngbModalRef = this.channelModalRef(component, channel);
          resolve(this.ngbModalRef);
        });
      } else {
        // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.ngbModalRef = this.channelModalRef(component, new Channel());
          resolve(this.ngbModalRef);
        }, 0);
      }
    });
  }

  channelModalRef(component: Component, channel: Channel): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.channel = channel;
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