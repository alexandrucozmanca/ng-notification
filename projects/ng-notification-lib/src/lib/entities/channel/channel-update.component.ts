import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChannel, Channel } from './channel.model';
import { ChannelService } from './channel.service';
import {ToastService} from 'ng-utils';


@Component({
  selector: 'ng-notification-channel-update',
  templateUrl: './channel-update.component.html',
  styleUrls: ['../../style/style.css']
})
export class ChannelUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    value: [],
    type: []
  });

  constructor(protected channelService: ChannelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder, protected toastService: ToastService) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ channel }) => {
      this.updateForm(channel);
    });
  }

  updateForm(channel: IChannel) {
    this.editForm.patchValue({
      value: channel.value,
      type: channel.type
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const channel = this.createFromForm();
    if (channel.value !== undefined) {
      this.subscribeToSaveResponse(this.channelService.update(channel));
    } else {
      this.subscribeToSaveResponse(this.channelService.create(channel));
    }
  }

  private createFromForm(): IChannel {
    return {
      ...new Channel(),
      value: this.editForm.get(['value']).value,
      type: this.editForm.get(['type']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChannel>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.toastService.successCreateMessage('Channel');
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
    this.toastService.errorCreateFail('Channel');
  }
}
