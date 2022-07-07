import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http: HttpClient) { }
  url: string = environment.serverFile

  //_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNpZ25hdHVyZSI6IjA0NzI3NGU1ZWY4YWVlYjAzNWZmYjQ0ZmQ1ZWMwYmM0YTAxMWU0MzFhYzFkYTNkZGE2Y2M2NWQ2NDI5OTZkM2ZlYmM4NjFhZjUzODc3N2I5NWI5NWU5NTcyOTRmYWUyNGRmNzQ2NWNmOTRjNWEwY2I5YzNhMjY5MjJkZjJhMDIxNDciLCJwaG9uZU51bWJlciI6Iis4NTYyMDc3NzkwMzkwIiwidXVpZCI6IjhmZGVjZmIwLTZkMmUtMTFlYy1iYjQxLWYzZDkwMGY1MTAxMyIsImlwIjoiMTkyLjE2OC4xNDQuMSIsIm1hY2hpbmUiOiJ3aW5kb3dzIiwib3RoZXJpbmZvIjoibGFvYXBwLmNvbSIsImxvY2F0aW9uIjoidmllbnRpYW5lIn0sImlhdCI6MTY0MTI4MDcyOSwiZXhwIjozNjAwMDAwMTY0MTI4MDczMH0.y_mlkT6Mm_V-yLl5CdxQ3WH89CIEJRu2TpRKu9Pb6iI";
  //_Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNpZ25hdHVyZSI6IjA0NzI3NGU1ZWY4YWVlYjAzNWZmYjQ0ZmQ1ZWMwYmM0YTAxMWU0MzFhYzFkYTNkZGE2Y2M2NWQ2NDI5OTZkM2ZlYmM4NjFhZjUzODc3N2I5NWI5NWU5NTcyOTRmYWUyNGRmNzQ2NWNmOTRjNWEwY2I5YzNhMjY5MjJkZjJhMDIxNDciLCJwaG9uZU51bWJlciI6Iis4NTYyMDc3NzkwMzkwIiwidXVpZCI6IjhmZGVjZmIwLTZkMmUtMTFlYy1iYjQxLWYzZDkwMGY1MTAxMyIsImlwIjoiMTkyLjE2OC4yMjQuMSIsIm1hY2hpbmUiOiJ3aW5kb3dzIiwib3RoZXJpbmZvIjoibGFvYXBwLmNvbSIsImxvY2F0aW9uIjoidmllbnRpYW5lIn0sImlhdCI6MTY0MTM3Njc0NCwiZXhwIjozNjAwMDAwMTY0MTM3Njc0NH0.boZRimXp23KZwRKUfns150256ejbDy2VacENO9Xy3wM';
  _Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNpZ25hdHVyZSI6IjA0NzI3NGU1ZWY4YWVlYjAzNWZmYjQ0ZmQ1ZWMwYmM0YTAxMWU0MzFhYzFkYTNkZGE2Y2M2NWQ2NDI5OTZkM2ZlYmM4NjFhZjUzODc3N2I5NWI5NWU5NTcyOTRmYWUyNGRmNzQ2NWNmOTRjNWEwY2I5YzNhMjY5MjJkZjJhMDIxNDciLCJwaG9uZU51bWJlciI6Iis4NTYyMDc3NzkwMzkwIiwidXVpZCI6IjhmZGVjZmIwLTZkMmUtMTFlYy1iYjQxLWYzZDkwMGY1MTAxMyIsImlwIjoiMTkyLjE2OC4yMjQuMSIsIm1hY2hpbmUiOiJ3aW5kb3dzIiwib3RoZXJpbmZvIjoibGFvYXBwLmNvbSIsImxvY2F0aW9uIjoidmllbnRpYW5lIn0sImlhdCI6MTY0MTM3Njc0NCwiZXhwIjozNjAwMDAwMTY0MTM3Njc0NH0.boZRimXp23KZwRKUfns150256ejbDy2VacENO9Xy3wM';

  uploadFile(data: FormData): Observable<any> {
    return this.http.post(this.url + 'file/newstore', data, { headers: this.headerBaseUpload(this._Token) });
  }

  selectmany(data: Object): Observable<any> {
    return this.http.post(this.url + "file/selectmany", data, { headers: this.headerBase(this._Token) });
  }

  deleteFile(id: any): Observable<any> {
    return this.http.post(this.url + 'file/del/' + id, {},
      { headers: this.headerBase(this._Token) });
  }

  protected headerBase(tkn: string = ""): any {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : tkn;
  //  const headers = new HttpHeaders({}).set('Token', token);
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' }).set('Token', token);
    // headers.set('Content-Type', 'application/json' );
    return headers;
  }
  protected headerBaseUpload(tkn: string = ""): any {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : tkn;
    const headers = new HttpHeaders({}).set('Token', token);
    return headers;
  }
}




// protected headerBase(m:string=""): any { 'multipart/form-data'
//   const token = localStorage.getItem('token');
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
//   .set('authorization', token+'')
//   .set('m', m);
//   return headers;
// }