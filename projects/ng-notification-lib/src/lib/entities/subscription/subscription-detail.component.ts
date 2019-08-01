import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from './subscription.model';
import {faArrowLeft, faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ng-notification-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['../../style/style.css']
})
export class SubscriptionDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;

  subscription: ISubscription;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subscription }) => {
      this.subscription = subscription;
    });
  }

  previousState() {
    window.history.back();
  }
}
