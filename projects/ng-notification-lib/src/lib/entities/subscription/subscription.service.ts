import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubscription } from './subscription.model';
import {NOTIFICATION_CONFIG} from '../../ng-notification-config';
import {Channel, ChannelService} from '../channel';
import {createRequestOption} from 'ng-utils';

type EntityResponseType = HttpResponse<ISubscription>;
type EntityArrayResponseType = HttpResponse<ISubscription[]>;

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  public resourceUrl: string;
  public rolesArray: string[];

  constructor(protected http: HttpClient, protected channelService: ChannelService, @Inject(NOTIFICATION_CONFIG) private config) {
    this.resourceUrl = config.serviceURL + '/subscriptions';
    this.rolesArray = config.rolesArray;
  }

  getRolesArray(): string[] {
    return this.rolesArray;
  }

  create(subscription: ISubscription): Observable<EntityResponseType> {
    return this.http.post<ISubscription>(this.resourceUrl, subscription, { observe: 'response' });
  }

  update(subscription: ISubscription): Observable<EntityResponseType> {
    return this.http.put<ISubscription>(this.resourceUrl, subscription, { observe: 'response' });
  }

  find(address: string): Observable<EntityResponseType> {
    return this.http.get<ISubscription>(`${this.resourceUrl}/${address}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscription[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(value: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${value}`, { observe: 'response' });
  }

  getTopics(): Observable<HttpResponse<Channel[]>> {
    return this.channelService.getTopics();
  }
}
