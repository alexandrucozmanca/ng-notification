import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChannel } from './channel.model';
import {NOTIFICATION_CONFIG} from '../../ng-notification-config';
import {createRequestOption} from 'ng-utils';

type EntityResponseType = HttpResponse<IChannel>;
type EntityArrayResponseType = HttpResponse<IChannel[]>;

@Injectable({ providedIn: 'root' })
export class ChannelService {
  public resourceUrl: string;

  constructor(protected http: HttpClient, @Inject(NOTIFICATION_CONFIG) private config) {
    this.resourceUrl = config.serviceURL + '/channels';

  }

  create(channel: IChannel): Observable<EntityResponseType> {
    return this.http.post<IChannel>(this.resourceUrl, channel, { observe: 'response' });
  }

  update(channel: IChannel): Observable<EntityResponseType> {
    return this.http.put<IChannel>(this.resourceUrl, channel, { observe: 'response' });
  }

  find(address: string): Observable<EntityResponseType> {
    return this.http.get<IChannel>(`${this.resourceUrl}/${address}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChannel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(value: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${value}`, { observe: 'response' });
  }

  getTopics(): Observable<EntityArrayResponseType> {
    return this.http.get<IChannel[]>(`${this.resourceUrl}/topics`, { observe: 'response' });
  }
}
