import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INotification } from './notification.model';
import {faArrowLeft, faEdit, faPaperPlane} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ng-notification-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['../../style/style.css']
})
export class NotificationDetailComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  faPlane = faPaperPlane;

  notification: INotification;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.notification = notification;
    });
  }

  previousState() {
    window.history.back();
  }
}
