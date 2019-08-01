import {InjectionToken} from '@angular/core';

export class NgNotificationConfig {
  public serviceURL: string;
  public rolesArray: string[];
  public itemsPerPage: number;
  public firebaseConfig: any;
  public publicVapidKey: string;

  constructor(serviceURL: string, rolesArray: string[], itemsPerPage: number, firebaseConfig: any, publicVapidKey: string) {
    this.serviceURL = serviceURL;
    this.rolesArray = rolesArray;
    this.itemsPerPage = itemsPerPage;
    this.firebaseConfig = firebaseConfig;
    this.publicVapidKey = publicVapidKey;
    this.rolesArray = rolesArray;
  }
}

export const NOTIFICATION_CONFIG = new InjectionToken<NgNotificationConfig>('NOTIFICATION_CONFIG');
