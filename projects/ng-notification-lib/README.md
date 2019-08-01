
## Build

Run `ng build ng-notification-lib` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-notification-lib`, go to the dist folder `cd dist/ng-notification-lib` and run `npm publish`.

## Publishing to Trencadis repo
`npm login --registry http://repository.trencadis.ro:8081/repository/npm-hosted/`


## Library config: 
  NgNotificationConfig {
  
    serviceURL: string  <-- notification API URL - will append notification, channel and subscription to each submodule
    rolesArray: string[] <-- rolesArray used by subscription sub-module as selector for topic subscriptions
    itemsPerPage: number <-- max number of items to be shown in module lists
    firebaseConfig: {
      apiKey: ---
      authDomain: ---
      databaseURL:---
      projectId: ---
      storageBucket: ---
      messagingSenderId: ---
    }  <-- Firebase project config
    publicVapidKey: string <-- publicVapidKey of the Firebase project
  }

## Library usage:
 - add NgNotificationModule with complete config to desired module
 
 - the 3 sub-modules - Notification, Channel and Subscription can be loaded independently 
 
 - the notification-card component (tag `<ng-notification-card>`) requires access to
 the application's account service in order to obtain tokens and subscribe to the push Server
 ex: `<ng-notification-card [accountService]="accountService"></ng-notification-card>`
 the component is meant to be used to display notifications and must be included in an always-present component
 (ex nav-bar, footer)   
 
 - add a service-worker named `firebase-messaging-sw.js` to the root directory and add the following:

`importScripts('https://www.gstatic.com/firebasejs/6.3.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/6.3.1/firebase-messaging.js'); 
 firebase.initializeApp(
 {
    apiKey: ---
   authDomain: ---
   databaseURL: ---
   projectId: ---
   storageBucket: ---
   messagingSenderId: ---
 });
 var messaging = firebase.messaging();`

use the same configs as the NgNotificationModule configs

- register the service-worker file in angular.json's assets array:
   `"assets": ["firebase-messaging-sw.js"]`
(you can use another file name as long as you are consistent between the last 2 steps)

- add a "gcm_sender_id" to manifest.webapp - the value differs from browser to browser
`"gcm_sender_id": "103953800507"  <-- Chrome`


- if, after building the app, the service-worker can not be located, you might need to add the following to webpack.common.js's CopyWebpackPlugin array:
`{ from: './src/main/webapp/firebase-messaging-sw.js', to: 'firebase-messaging-sw.js' } `

Remember the back-end must also be configured with the Firebase project`s Server key found under the Settings -> Cloud Messaging-> Server Key
