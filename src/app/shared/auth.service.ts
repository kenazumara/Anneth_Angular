import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root',

  
})
export class AuthService {

  currentUser: any
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = 'http://127.0.0.1:5000/api/v1/user/login';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, { email, password }, { headers, withCredentials: true }).pipe(
      map((data) => this.currentUser = data.data),
      shareReplay(1),
      tap((data) => {console.log(this.currentUser); console.log(data)})
    );

  }

  get isLoggedIn()  {
    return !! this.currentUser
    
  }

  logout(){
    const url = 'http://127.0.0.1:5000/api/v1/user/logout';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, {}, { headers, withCredentials: true }).pipe(
      map((data) => this.currentUser = undefined),
      shareReplay(1),
      tap((data) => {console.log(this.currentUser); console.log(data)})
    );
  }

  signup(user: User): Observable<User> {
    user = {
      firstName:user.firstName,
      lastName:user.lastName,
      password:user.password,
      confirmPassword:user.confirmPassword,
      email:user.email,
      phone:user.phone,
      gender:user.gender
    }
    const url = 'http://127.0.0.1:5000/api/v1/user/signup';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, user, { headers }).pipe(
      map((data) => this.currentUser =  data.data),
      shareReplay(1),
      tap((data) => {})
    );
  }

  getUser(): Observable<any> {
    const url = 'http://127.0.0.1:5000/api/v1/user/getMe';
    return this.http.get<any>(url, { withCredentials: true }).pipe(
      map((data) => data.data.data),
      tap((data) => console.log(data))
    );
  }

  // getUserAddress(): Observable<any> {
  //   const url = 'http://127.0.0.1:5000/api/v1/user/address';
  //   return this.http.get<any>(url, { withCredentials: true }).pipe(
  //     map((data) => data.data.data),
  //     tap((data) => console.log(data))
  //   );
  // }
}
