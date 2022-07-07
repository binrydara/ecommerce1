import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  public url: string = environment.server;


  register(param: any): Observable<any> {

    return this.http.post(this.url+'authUM/register', param);
  }
  login(param: any): Observable<any> {

    return this.http.post(this.url+'authUM/login', param);
  }

  loggedIn() {
    return localStorage.getItem('token')
  }
}
