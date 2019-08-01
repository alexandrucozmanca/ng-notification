import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {NgNotificationModule} from "../../projects/ng-notification-lib/src/lib/ng-notification.module";
import {HttpClientModule} from "@angular/common/http";


const RESOURCE_URL = 'http://localhost:8083/services/notification/api/v1';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgNotificationModule.forRoot({
      serviceURL: 'services/notification/api/v1',
      rolesArray: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_TEST'],
      itemsPerPage: 10,
      firebaseConfig: {
        apiKey: 'AIzaSyCnTJxIdmGGUKhdtMoRIh_kGY_KrpWt_l4',
        authDomain: 'powerd-web.firebaseapp.com',
        databaseURL: 'https://powerd-web.firebaseio.com',
        projectId: 'powerd-web',
        storageBucket: 'powerd-web.appspot.com',
        messagingSenderId: '656309086007'
      },
      publicVapidKey: 'BHT63A42YH3l83aP2Q5oct-6vp1RIYecnlUYNUg13SBHisHod0_F3mAuQb7xOYCG43r4iHmv3C6r6aIQWb3Vd6U'
    }),
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
