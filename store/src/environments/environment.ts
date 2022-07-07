// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // server:'https://onlinestore-api.laoapps.com/api/v1/',
  server:'http://localhost:22000/api/v1/',
  server_orderbilling:'https://orderbilling-api.laoapps.com/api/v1/',
  server_inventory:'http://localhost:24000/api/v1/',
  // server_inventory:'https://onlineinventory-api.laoapps.com/api/v1/',
  server_usermanager:'https://nocnoc-api.laoapps.com/',
  vdpserver:'https://vdp-api.laoapps.com/',
  serverFile:'http://localhost:24556/api/v1/',
  fileManger:'http://localhost:22000/api/v1/file',
  //24556
};
export const FBConfig = {
  apiKey: "AIzaSyAT_XJJswz2m5zCeaHzLnHfLInP8-v3Rig",
  authDomain: "nocnoc-46051.firebaseapp.com",
  projectId: "nocnoc-46051",
  storageBucket: "nocnoc-46051.appspot.com",
  messagingSenderId: "452313132592",
  appId: "1:452313132592:web:4c918d295f46fccc0907f5",
  measurementId: "${config.measurementId}",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
