import {Inject, Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';

import 'rxjs/add/operator/take';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {NOTIFICATION_CONFIG} from '../ng-notification-config';
import {EventManager} from 'ng-utils';

@Injectable()
export class MessagingService {
  private init: any;
  private messaging: any;

  public currentMessage = new BehaviorSubject(null);
  readonly resourceUrl: string;
  readonly  publicVapidKey: string

  constructor(
    private eventManager: EventManager,
    private http: HttpClient,
    @Inject(NOTIFICATION_CONFIG) private config
  ) {
    this.init = firebase.initializeApp(config.firebaseConfig);
    this.messaging = firebase.messaging();
    this.resourceUrl = config.serviceURL + '/subscribe/';
    this.publicVapidKey = config.publicVapidKey;
  }

  subscribeTopic(token, topic) {
    return this.http.post(this.resourceUrl + topic + '/' + token, null, { observe: 'response' });
  }

  updateToken(username, token) {
    this.subscribeTopic(token, 'building').subscribe(response => {
      console.log('Subscribe Topic', response);
    });
  }

  getPermission(username) {
    this.messaging.usePublicVapidKey(this.publicVapidKey);
    this.messaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        this.messaging.getToken().then(token => {
          this.updateToken(username, token);
        });
      })
      .catch(err => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage(payload => {
      this.eventManager.broadcast({ name: 'newNotification', content: payload });
      this.currentMessage.next(payload);
    });
  }
}
