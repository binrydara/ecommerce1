import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatapassService } from './datapass.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient,public dataPassService:DatapassService,public load:LoadingController,public alrt:AlertController) { }
  
  protected getBaseUrl_orderbilding(): string {
  
    return environment.server_orderbilling;
    //  return 'http://localhost:21000/api/v1/';
  
  }
  protected getBaseUrl_inventory(): string {
  
    return environment.server_inventory;
    //  return 'http://localhost:24000/api/v1/';
  
  }
  protected getBaseUrl(): string {
  
    //  return 'http://localhost:22000/api/v1/';
     return environment.server;
  
  }
  protected getBaseUrl_auth(): string {
  
    return environment.server_usermanager;
    //  return 'http://localhost:4500/';
    //  return 'http://laotracking.com:4500/';
  
  }
  protected getBaseUrl_vdp(): string {
  
      //  return 'http://192.168.1.122:8080/inventory-management/sign-in';
      // return 'http://localhost:9599/inventory/';
  
      //  return 'http://laotracking.com:23000/';
      // return location.protocol + '//' + location.host+'/api/';
      environment.production=true;
      console.log(environment.production);
      const url=!environment.production? location.protocol + '//' + location.host+'/api/':environment.vdpserver;
      return url;

  
  }

  protected getFileManagerUrl(): string {
  
    //  return 'http://localhost:22000/api/v1/';
     return environment.fileManger;
  
  }

  protected headerBase(): any {
    const token = localStorage.getItem('token');
    let skip=localStorage.getItem('skip')
    let skip_store=localStorage.getItem('skip_store')
    let skip_tag=localStorage.getItem('skip_tag')
    
    if(skip==null){
      skip='0'
    }
    if(skip_tag==null){
      skip_tag='0'
    }
    if(skip_store==null){
      skip_store='0'
    }
    
    // const authorization='dba123456';
    // .set('authorization',authorization+'');
    
    const myheader = new HttpHeaders({ 'Content-Type': 'application/json'})
    .set('token', token+'').set('skip',skip+'').set('skip_store',skip_store+'').set('skip_tag',skip_tag+'');
    return myheader;
  }

  async alert(text: string) {
    const alert = await this.alrt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }


  getImage (img: string){
    return this.getFileManagerUrl()+'/download/'+img
  }
}
