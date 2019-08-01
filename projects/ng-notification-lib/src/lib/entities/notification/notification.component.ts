import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NotificationService } from './notification.service';
import {INotification} from './notification.model';
import {faEye, faTrash, faEdit, faPlus, faPaperPlane, faSort} from '@fortawesome/free-solid-svg-icons';
import {NOTIFICATION_CONFIG} from '../../ng-notification-config';
import {EventManager} from 'ng-utils';


@Component({
  selector: 'ng-notification-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['../../style/style.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  faTrash = faTrash;
  faEye = faEye;
  faEdit = faEdit;
  faPlus = faPlus;
  faPaperPlane = faPaperPlane;
  faSort = faSort;
  
  notifications: INotification[];
  error: any;
  success: any;
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
    protected notificationService: NotificationService,
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
    this.notificationService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<INotification[]>) => this.paginateNotifications(res.body, res.headers)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/notification'], {
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
      '/notification',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.order ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInNotifications();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INotification) {
    return item.id;
  }

  registerChangeInNotifications() {
    this.eventSubscriber = this.eventManager.subscribe('notificationListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.order ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateNotifications(data: INotification[], headers: HttpHeaders) {
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.notifications = data;
  }
}
