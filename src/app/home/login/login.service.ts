import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  // currentUser: any
  // constructor(private http: HttpClient) {}

  // login(email: string, password: string) {
  //   const url = 'http://127.0.0.1:5000/api/v1/user/login';
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(url, { email, password }, { headers, withCredentials: true }).pipe(
  //     map((data) => this.currentUser = data.data),
  //     shareReplay(1),
  //     tap((data) => {console.log(this.currentUser); console.log(data)})
  //   );

  // }
  // get isLoggedIn()  {
  //   return !! this.currentUser
    
  // }
}

