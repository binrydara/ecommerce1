// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server:'https://onlinestore-api.laoapps.com/api/v1/',
  server_orderbilling:'https://orderbilling-api.laoapps.com/api/v1/',
  server_inventory:'https://onlineinventory-api.laoapps.com/api/v1/',
  server_usermanager:'https://nocnoc-api.laoapps.com/',
  vdpserver:'https://vdp-api.laoapps.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
