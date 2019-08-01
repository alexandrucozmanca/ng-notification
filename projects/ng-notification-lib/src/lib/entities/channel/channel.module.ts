import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {channelPopupRoute, channelRoute} from './channel.route';
import {ChannelComponent} from './channel.component';
import {ChannelDetailComponent} from './channel-detail.component';
import {ChannelUpdateComponent} from './channel-update.component';
import {ChannelCreateComponent} from './channel-create.component';
import {ChannelDeleteDialogComponent, ChannelDeletePopupComponent} from './channel-delete-dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgUtilsModule} from 'ng-utils';

const ENTITY_STATES = [...channelRoute, ...channelPopupRoute];

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
    ChannelComponent,
    ChannelDetailComponent,
    ChannelUpdateComponent,
    ChannelCreateComponent,
    ChannelDeleteDialogComponent,
    ChannelDeletePopupComponent
  ],
  entryComponents: [
    ChannelComponent,
    ChannelUpdateComponent,
    ChannelCreateComponent,
    ChannelDeleteDialogComponent,
    ChannelDeletePopupComponent
  ],
  exports: [
    ChannelComponent,
    ChannelDetailComponent,
    ChannelUpdateComponent,
    ChannelCreateComponent,
    ChannelDeleteDialogComponent,
    ChannelDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChannelModule {}
