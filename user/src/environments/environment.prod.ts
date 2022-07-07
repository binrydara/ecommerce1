import { truncateSync } from "fs";

export const environment = {
  production: true,
  server:'https://onlinestore-api.laoapps.com/api/v1/',
  server_orderbilling:'https://orderbilling-api.laoapps.com/api/v1/',
  server_inventory:'https://onlineinventory-api.laoapps.com/api/v1/',
  server_usermanager:'https://nocnoc-api.laoapps.com/',
  vdpserver:'https://vdp-api.laoapps.com/',

  serverFile:'http://localhost:24556/api/v1/',
  fileManger:'http://localhost:22000/api/v1/file',
};
export const FBConfig = {
  apiKey: "AIzaSyAT_XJJswz2m5zCeaHzLnHfLInP8-v3Rig",
  authDomain: "nocnoc-46051.firebaseapp.com",
  projectId: "nocnoc-46051",
  storageBucket: "nocnoc-46051.appspot.com",
  messagingSenderId: "452313132592",
  appId: "1:452313132592:web:4c918d295f46fccc0907f5",
  measurementId: "${config.measurementId}"
};
