import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubscription, Subscription } from './subscription.model';
import { SubscriptionService } from './subscription.service';
import {Channel} from '../channel';
import {ToastService} from 'ng-utils';

@Component({
  selector: 'ng-notification-subscription-update',
  templateUrl: './subscription-update.component.html',
  styleUrls: ['../../style/style.css']
})
export class SubscriptionUpdateComponent implements OnInit {
  isSaving: boolean;
  roles = [];
  channels: Channel[] = [];
  possibleTopics: any[] = [];
  loadedTopics: any[] = [];

  editForm = this.fb.group({
    id: [],
    role: [],
    topics: ['', Validators.required]
  });

  constructor(protected subscriptionService: SubscriptionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder, protected toastService: ToastService) {}

  async ngOnInit() {
    this.isSaving = false;
    this.subscriptionService.getTopics().subscribe(topicQuery => {
      this.channels = topicQuery.body;
      this.convertQueryToPossibleTopics(topicQuery.body);

      this.activatedRoute.data.subscribe(({ subscription }) => {
        this.updateForm(subscription);
      });

      this.roles = this.subscriptionService.getRolesArray();
    });
  }

  updateForm(subscription: ISubscription) {
    if (subscription && subscription.topics) {
      subscription.topics.forEach(
        topic =>
          (this.loadedTopics = [
            ...this.loadedTopics,
            this.possibleTopics.findIndex(possibleTopic => possibleTopic.topic === topic.value) + 1
          ])
      );
    }

    this.editForm.patchValue({
      id: subscription.id,
      role: subscription.role,
      topics: this.loadedTopics
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const subscription = this.createFromForm();
    this.subscribeToSaveResponse(this.subscriptionService.create(subscription));
  }

  private createFromForm(): ISubscription {
    const subscription: Subscription = new Subscription();

    subscription.id = this.editForm.get(['id']).value;
    subscription.role = this.editForm.get(['role']).value;
    subscription.topics = [];
    (this.editForm.get(['topics']).value as number[]).forEach(topicIndex => subscription.topics.push(this.channels[topicIndex - 1]));

    return subscription;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscription>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.toastService.successCreateMessage('Subscription');
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
    this.toastService.errorCreateFail('Subscription');
  }

  private convertQueryToPossibleTopics(topics: Channel[]) {
    this.possibleTopics = [];
    topics.forEach((topic, index) => this.possibleTopics.push({ id: index + 1, topic: topic.value }));
  }
}
