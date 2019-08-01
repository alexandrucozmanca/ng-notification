import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NgSelectModule} from '@ng-select/ng-select';

import {subscriptionPopupRoute, subscriptionRoute} from './subscription.route';
import {SubscriptionComponent} from './subscription.component';
import {SubscriptionDetailComponent} from './subscription-detail.component';
import {SubscriptionUpdateComponent} from './subscription-update.component';
import {
  SubscriptionDeleteDialogComponent,
  SubscriptionDeletePopupComponent
} from './subscription-delete-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgUtilsModule} from 'ng-utils';

const ENTITY_STATES = [...subscriptionRoute, ...subscriptionPopupRoute];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    NgSelectModule,
    NgUtilsModule,
    RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [
    SubscriptionComponent,
    SubscriptionDetailComponent,
    SubscriptionUpdateComponent,
    SubscriptionDeleteDialogComponent,
    SubscriptionDeletePopupComponent
  ],
  entryComponents: [
    SubscriptionComponent,
    SubscriptionUpdateComponent,
    SubscriptionDeleteDialogComponent,
    SubscriptionDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubscriptionModule {
}

