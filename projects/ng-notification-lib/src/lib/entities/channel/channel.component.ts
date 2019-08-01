import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';


import {ChannelService} from './channel.service';
import {IChannel} from './channel.model';
import {faEye, faPlus, faSort, faTrash} from '@fortawesome/free-solid-svg-icons';
import {NOTIFICATION_CONFIG} from '../../ng-notification-config';
import {EventManager} from 'ng-utils';

@Component({
  selector: 'ng-notification-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['../../style/style.css']
})
export class ChannelComponent implements OnInit, OnDestroy {
  faTrash = faTrash;
  faEye = faEye;
  faPlus = faPlus;
  faSort = faSort;

  channels: IChannel[];
  error: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  order: any;

  constructor(
    protected channelService: ChannelService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: EventManager,
    @Inject(NOTIFICATION_CONFIG) private config
  ) {
    this.itemsPerPage = config.itemsPerPage;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.order = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.channelService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IChannel[]>) => this.paginateChannels(res.body, res.headers)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/channel'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.order ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/channel',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.order ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInChannels();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackValue(index: number, item: IChannel) {
    return item.value;
  }

  registerChangeInChannels() {
    this.eventSubscriber = this.eventManager.subscribe('channelListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.order ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateChannels(data: IChannel[], headers: HttpHeaders) {
    // this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.channels = data;
  }
}
