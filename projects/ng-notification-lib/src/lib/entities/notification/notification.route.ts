import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification.component';
import { NotificationDetailComponent } from './notification-detail.component';
import { NotificationUpdateComponent } from './notification-update.component';
import { NotificationDeletePopupComponent } from './notification-delete-dialog.component';
import { NotificationSendPopupComponent } from './notification-send-dialog.component';
import { Notification } from './notification.model';
import {ResolvePagingParams} from 'ng-utils';

@Injectable({ providedIn: 'root' })
export class NotificationResolve implements Resolve<Notification> {
  constructor(private service: NotificationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Notification> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Notification>) => response.ok),
        map((notification: HttpResponse<Notification>) => notification.body)
      );
    }
    return of(new Notification());
  }
}

export const notificationRoute: Routes = [
  {
    path: '',
    component: NotificationComponent,
    resolve: {
      pagingParams: ResolvePagingParams
    },
    data: {
      authorities: ['ROLE_NOTIFICATION_LIST'],
      defaultSort: 'id,asc',
      pageTitle: 'portalApp.notification.home.title'
    }
  },
  {
    path: ':id/view',
    component: NotificationDetailComponent,
    resolve: {
      notification: NotificationResolve
    },
    data: {
      authorities: ['ROLE_NOTIFICATION_VIEW'],
      pageTitle: 'portalApp.notification.home.title'
    }
  },
  {
    path: 'new',
    component: NotificationUpdateComponent,
    resolve: {
      notification: NotificationResolve
    },
    data: {
      authorities: ['ROLE_NOTIFICATION_NEW'],
      pageTitle: 'portalApp.notification.home.title'
    }
  },
  {
    path: ':id/edit',
    component: NotificationUpdateComponent,
    resolve: {
      notification: NotificationResolve
    },
    data: {
      authorities: ['ROLE_NOTIFICATION_EDIT'],
      pageTitle: 'portalApp.notification.home.title'
    }
  }
];

export const notificationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NotificationDeletePopupComponent,
    resolve: {
      notification: NotificationResolve
    },
    data: {
      authorities: ['ROLE_NOTIFICATION_DELETE'],
      pageTitle: 'portalApp.notification.home.title'
    },
    outlet: 'popup'
  },
  {
    path: ':id/send',
    component: NotificationSendPopupComponent,
    resolve: {
      notification: NotificationResolve
    },
    data: {
      authorities: ['ROLE_NOTIFICATION_SEND'],
      pageTitle: 'portalApp.notification.home.title'
    },
    outlet: 'popup'
  }
];
