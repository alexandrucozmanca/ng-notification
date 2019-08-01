import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {MessagingService} from '../../../messaging/messaging.service';
import {Subscription} from 'rxjs';
import {EventManager} from 'ng-utils';


@Component({
  selector: 'ng-notification-card',
  templateUrl: './notification-card.component.html',
  styles: [
    '.notification { text-align: left; min-width: 400px; background-color: white; border-radius: 12px; position: absolute; left: auto; right: 30px; top: 50px; z-index: 1;}',
    '.trash { color:red }'
  ]
})
export class NotificationCardComponent implements OnInit, OnDestroy {

  @Input() accountService: any;
  notifications: any[];
  eventSubscriber: Subscription;
  message: any;
  faTrash = faTrash;

  constructor(
    private msgService: MessagingService,
    private eventManager: EventManager
  ) {
  }

  ngOnInit() {
    this.notifications = [];
    this.registerNotifications();

    this.accountService.identity().then(account => {
      if (account !== null) {
        this.msgService.getPermission(account.login);
        this.msgService.receiveMessage();
        this.message = this.msgService.currentMessage;
      }
    });
  }

  ngOnDestroy() {
    this.eventSubscriber.unsubscribe();
  }

  removeNotification(notification) {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }

  registerNotifications() {
    this.eventSubscriber = this.eventManager.subscribe('newNotification', response => {
      this.notifications.push(response);
    });
  }
}
