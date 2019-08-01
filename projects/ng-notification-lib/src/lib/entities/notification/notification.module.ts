import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule } from '@angular/router';

import {notificationPopupRoute, notificationRoute} from './notification.route';
import {NotificationComponent} from './notification.component';
import {NotificationDetailComponent} from './notification-detail.component';
import {NotificationUpdateComponent} from './notification-update.component';
import {
  NotificationDeleteDialogComponent,
  NotificationDeletePopupComponent
} from './notification-delete-dialog.component';
import {NotificationSendDialogComponent, NotificationSendPopupComponent} from './notification-send-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgUtilsModule} from 'ng-utils';

const ENTITY_STATES = [...notificationRoute, ...notificationPopupRoute];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    NgUtilsModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [
    NotificationComponent,
    NotificationDetailComponent,
    NotificationUpdateComponent,
    NotificationDeleteDialogComponent,
    NotificationDeletePopupComponent,
    NotificationSendDialogComponent,
    NotificationSendPopupComponent
  ],
  entryComponents: [
    NotificationComponent,
    NotificationUpdateComponent,
    NotificationDeleteDialogComponent,
    NotificationDeletePopupComponent,
    NotificationSendPopupComponent,
    NotificationSendDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationModule {}
