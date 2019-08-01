import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-notification-nav-bar',
  templateUrl: './notification-nav-bar.component.html'
})
export class NotificationNavBarComponent {
  @Input() visible: boolean;

  constructor() {}
}
