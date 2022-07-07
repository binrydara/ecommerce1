import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  public url:string='https://onlinestore-api.laoapps.com/api/v1/';

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
