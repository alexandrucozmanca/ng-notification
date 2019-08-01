import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DATE_TIME_FORMAT } from '../../constants/input.constants';
import { INotification, Notification } from './notification.model';
import { NotificationService } from './notification.service';

import * as moment_ from 'moment';
import {ToastService} from 'ng-utils';
const moment = moment_;

@Component({
  selector: 'ng-notification-notification-update',
  templateUrl: './notification-update.component.html',
  styleUrls: ['../../style/style.css']
})
export class NotificationUpdateComponent implements OnInit {

  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    ts: [],
    title: [],
    description: [],
    icon: [],
    level: []
  });

  constructor(protected notificationService: NotificationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder, protected toastService: ToastService) {}



  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.updateForm(notification);
    });
  }

  updateForm(notification: INotification) {
    this.editForm.patchValue({
      id: notification.id,
      ts: notification.ts != null ? notification.ts.format(DATE_TIME_FORMAT) : null,
      title: notification.title,
      description: notification.description,
      icon: notification.icon,
      level: notification.level
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const notification = this.createFromForm();
    if (notification.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  private createFromForm(): INotification {
    return {
      ...new Notification(),
      id: this.editForm.get(['id']).value,
      ts: this.editForm.get(['ts']).value != null ? moment(this.editForm.get(['ts']).value, DATE_TIME_FORMAT) : undefined,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      icon: this.editForm.get(['icon']).value,
      level: this.editForm.get(['level']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.toastService.successCreateMessage('Notification');
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
    this.toastService.errorCreateFail('Subscription');
  }
}
