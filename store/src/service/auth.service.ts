import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  // public url: string = this.getBaseUrl_auth();
  public token = '';

  public url:string='https://onlinestore-api.laoapps.com/api/v1/';


  // login(param:any):Observable<any> {
  //   console.log(param);
    
  //   return this.http.post(this.url + 'Login', param);
  // }
  register(param:any):Observable<any> {

      return this.http.post(this.url+'authUM/register', param);
  }
  login(param:any):Observable<any> {

    return this.http.post(this.url+'authUM/login', param);
}
  

  loggedIn(){
    return !!localStorage.getItem('token')
  }
}
