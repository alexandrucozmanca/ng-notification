import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ChannelService } from './channel.service';
import { ChannelComponent } from './channel.component';
import { ChannelDetailComponent } from './channel-detail.component';
import { ChannelDeletePopupComponent } from './channel-delete-dialog.component';
import { Channel } from './channel.model';
import { ChannelCreateComponent } from './channel-create.component';
import {ResolvePagingParams} from 'ng-utils';

@Injectable({ providedIn: 'root' })
export class ChannelResolve implements Resolve<Channel> {
  constructor(private service: ChannelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Channel> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Channel>) => response.ok),
        map((channel: HttpResponse<Channel>) => channel.body)
      );
    }
    return of(new Channel());
  }
}

// TODO - clean-up Roles after testing
export const channelRoute: Routes = [
  {
    path: '',
    component: ChannelComponent,
    resolve: {
      pagingParams: ResolvePagingParams
    },
    data: {
      authorities: ['ROLE_CHANNEL_LIST'],
      defaultSort: 'id,asc',
      pageTitle: 'portalApp.channel.home.title'
    }
  },
  {
    path: ':id/view',
    component: ChannelDetailComponent,
    resolve: {
      channel: ChannelResolve
    },
    data: {
      authorities: ['ROLE_CHANNEL_VIEW'],
      pageTitle: 'portalApp.channel.home.title'
    }
  },
  {
    path: 'new',
    component: ChannelCreateComponent,
    resolve: {
      channel: ChannelResolve
    },
    data: {
      authorities: ['ROLE_CHANNEL_NEW'],
      pageTitle: 'portalApp.channel.home.title'
    }
  }
];

export const channelPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ChannelDeletePopupComponent,
    resolve: {
      channel: ChannelResolve
    },
    data: {
      authorities: ['ROLE_CHANNEL_DELETE'],
      pageTitle: 'portalApp.channel.home.title'
    },
    outlet: 'popup'
  }
];
