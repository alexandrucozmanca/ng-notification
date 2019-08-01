import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SubscriptionService } from './subscription.service';
import { ISubscription } from './subscription.model';
import {faEdit, faEye, faPlus, faSort, faTrash} from '@fortawesome/free-solid-svg-icons';
import {NOTIFICATION_CONFIG} from '../../ng-notification-config';
import {EventManager} from 'ng-utils';

@Component({
  selector: 'ng-notification-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['../../style/style.css']
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  faTrash = faTrash;
  faEye = faEye;
  faEdit = faEdit;
  faPlus = faPlus;
  faSort = faSort;

  subscriptions: ISubscription[];
  error: any;
  eventSubscriber: Subscription;
  routeData: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  order: any;

  constructor(
    protected subscriptionService: SubscriptionService,
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
    this.subscriptionService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ISubscription[]>) =>
        {
          this.paginateSubscriptions(res.body, res.headers);
          console.log(res.body)
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/subscription'], {
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
      '/subscription',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.order ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSubscriptions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISubscription) {
    return item.id;
  }

  registerChangeInSubscriptions() {
    this.eventSubscriber = this.eventManager.subscribe('subscriptionListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.order ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSubscriptions(data: ISubscription[], headers: HttpHeaders) {
    // this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.subscriptions = data;
  }

  protected onError(errorMessage: string) {
    // this.jhiAlertService.error(errorMessage, null, null);
  }
}
