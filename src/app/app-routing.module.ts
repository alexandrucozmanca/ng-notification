import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'channel',
    loadChildren: () => import('../../projects/ng-notification-lib/src/public-api').then(mod => mod.ChannelModule),
  },
  {
    path: 'notification',
    loadChildren: () => import('../../projects/ng-notification-lib/src/public-api').then(mod => mod.NotificationModule),


  },
  {
    path: 'subscription',
    loadChildren: () => import('../../projects/ng-notification-lib/src/public-api').then(mod => mod.SubscriptionModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
