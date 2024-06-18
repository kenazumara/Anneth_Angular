import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Address, User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:5000/api/v1/user/login';
  private logoutUrl = 'http://127.0.0.1:5000/api/v1/user/logout';
  private signupUrl = 'http://127.0.0.1:5000/api/v1/user/signup';
  private getUserUrl = 'http://127.0.0.1:5000/api/v1/user/getMe';
  private getAddressUrl = 'http://127.0.0.1:5000/api/v1/user/address';
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;
  redirectUrl!: string;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Initialize user from storage on service initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loadingSubject.next(true);

    return this.http
      .post<any>(
        this.loginUrl,
        { email, password },
        { headers, withCredentials: true }
      )
      .pipe(
        map((data) => {
          localStorage.setItem('currentUser', JSON.stringify(data.data));
          this.currentUserSubject.next(data.data);
          return data.data;
        }),
        shareReplay(1),
        tap((data) => {
          this.loadingSubject.next(false);
        }),
        catchError((error) => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        })
      );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loadingSubject.next(true);

    return this.http
      .post<any>(this.logoutUrl, {}, { headers, withCredentials: true })
      .pipe(
        map((data) => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          return data;
        }),
        shareReplay(1),
        tap((data) => {
          this.loadingSubject.next(false);
        }),
        catchError((error) => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        })
      );
  }

  signup(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loadingSubject.next(true);

    return this.http.post<any>(this.signupUrl, user, { headers }).pipe(
      map((data) => {
        localStorage.setItem('currentUser', JSON.stringify(data.data));
        this.currentUserSubject.next(data.data);
        return data.data;
      }),
      shareReplay(1),       
      tap((data) => {
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        this.loadingSubject.next(false);
        return this.handleError(error);
      })
    );
  }

  getUser(): Observable<any> {
    this.loadingSubject.next(true);

    return this.http.get<any>(this.getUserUrl, { withCredentials: true }).pipe(
      map((data) => {
        return data.data.data;
      }),
      tap((data) => {
        this.currentUserSubject.next(data)
        this.loadingSubject.next(false);
      }),
      catchError((err) => {
        this.loadingSubject.next(false);
        return this.handleError(err);
      })
    );
  }

  createReview(rating: number, comment: string, id: string): Observable<any> {
    const url = `http://127.0.0.1:5000/api/v1/products/${id}/review`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<any>(url, { rating, comment }, { headers, withCredentials: true })
      .pipe(
        map((data) => data),
        catchError((error) => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        })
      );
  }

  createAddress(address: Address): Observable<any> {
    const url = `http://127.0.0.1:5000/api/v1/user/address`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loadingSubject.next(true);
    return this.http
      .post<any>(url, address, { headers, withCredentials: true })
      .pipe(
        map((data) => data),
        tap((data) => {
          this.loadingSubject.next(false);
        }),
        catchError((error) => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        })
      );
  }

  getAddresses(): Observable<any> {
    this.loadingSubject.next(true);

    return this.http
      .get<any>(this.getAddressUrl, { withCredentials: true })
      .pipe(
        map((data) => {
          return data.data.data;
        }),
        tap((data) => {
          this.currentUserSubject.next(data)
          this.loadingSubject.next(false);
          console.log('user');
          console.log(data);
        }),
        catchError((err) => {
          this.loadingSubject.next(false);
          return this.handleError(err);
        })
      );
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}