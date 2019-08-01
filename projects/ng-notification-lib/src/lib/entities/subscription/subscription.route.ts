import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubscriptionService } from './subscription.service';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionDetailComponent } from './subscription-detail.component';
import { SubscriptionUpdateComponent } from './subscription-update.component';
import { SubscriptionDeletePopupComponent } from './subscription-delete-dialog.component';
import { Subscription } from './subscription.model';
import {ResolvePagingParams} from 'ng-utils';

@Injectable({ providedIn: 'root' })
export class SubscriptionResolve implements Resolve<Subscription> {
  constructor(private service: SubscriptionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subscription> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Subscription>) => response.ok),
        map((subscription: HttpResponse<Subscription>) => subscription.body)
      );
    }
    return of(new Subscription());
  }
}

// TODO - clean-up Roles after testing
export const subscriptionRoute: Routes = [
  {
    path: '',
    component: SubscriptionComponent,
    resolve: {
      pagingParams: ResolvePagingParams
    },
    data: {
      authorities: ['ROLE_SUBSCRIPTION_LIST'],
      defaultSort: 'id,asc',
      pageTitle: 'portalApp.subscription.home.title'
    }
  },
  {
    path: ':id/view',
    component: SubscriptionDetailComponent,
    resolve: {
      subscription: SubscriptionResolve
    },
    data: {
      authorities: ['ROLE_SUBSCRIPTION_VIEW'],
      pageTitle: 'portalApp.subscription.home.title'
    }
  },
  {
    path: 'new',
    component: SubscriptionUpdateComponent,
    resolve: {
      subscription: SubscriptionResolve
    },
    data: {
      authorities: ['ROLE_SUBSCRIPTION_NEW'],
      pageTitle: 'portalApp.subscription.home.title'
    }
  },
  {
    path: ':id/edit',
    component: SubscriptionUpdateComponent,
    resolve: {
      subscription: SubscriptionResolve
    },
    data: {
      authorities: ['ROLE_SUBSCRIPTION_EDIT'],
      pageTitle: 'portalApp.subscription.home.title'
    }
  }
];

export const subscriptionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SubscriptionDeletePopupComponent,
    resolve: {
      subscription: SubscriptionResolve
    },
    data: {
      authorities: ['ROLE_SUBSCRIPTION_DELETE'],
      pageTitle: 'portalApp.subscription.home.title'
    },
    outlet: 'popup'
  }
];
