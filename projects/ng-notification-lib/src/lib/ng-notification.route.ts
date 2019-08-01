import {Routes} from '@angular/router';

export const ng_notificationRoute: Routes = [
  {
    path: 'notification',
    loadChildren: './entities/notification/notification.module#NotificationModule'
  },
  {
    path: 'channel',
    loadChildren: './entities/channel/channel.module#ChannelModule'
  },
  {
    path: 'subscription',
    loadChildren: './entities/subscription/subscription.module#SubscriptionModule'
  },
];
