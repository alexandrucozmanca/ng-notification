import {RouterModule} from '@angular/router';
import {ChannelModule} from './entities/channel/channel.module';
import {SubscriptionModule} from './entities/subscription/subscription.module';
import {NotificationNavBarComponent} from './notification-nav-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {NgNotificationConfig, NOTIFICATION_CONFIG} from './ng-notification-config';
import {ng_notificationRoute} from './ng-notification.route';
import {NotificationModule} from './entities/notification/notification.module';
import {CommonModule} from '@angular/common';
import {NotificationService} from './entities/notification';
import { ChannelService} from './entities/channel';
import {SubscriptionService} from './entities/subscription';
import {ToastrModule} from 'ngx-toastr';
import {NotificationCardComponent} from './entities/notification/notification-card/notification-card.component';
import {MessagingService} from './messaging/messaging.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ResolvePagingParams} from 'ng-utils';

const ENTITY_STATES = [...ng_notificationRoute];

@NgModule({
  imports: [
    CommonModule,
    ChannelModule,
    NotificationModule,
    SubscriptionModule,
    RouterModule.forChild(ENTITY_STATES),
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right'
      }
    ),
    FontAwesomeModule
  ],
  declarations: [
    NotificationNavBarComponent,
    NotificationCardComponent
  ],
  exports: [
    ChannelModule,
    NotificationModule,
    SubscriptionModule,
    NotificationCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class NgNotificationModule {
  public static forRoot(config: NgNotificationConfig): ModuleWithProviders {
    return {
      providers: [
        {provide: NOTIFICATION_CONFIG, useValue: config},
        ResolvePagingParams,
        NotificationService,
        ChannelService,
        SubscriptionService,
        MessagingService
      ],
      ngModule: NgNotificationModule
    };
  }
}
