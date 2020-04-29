import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  apiServer: string = environment.apiServer;
  url: string;

  constructor(private http: HttpClient) {}

  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = this.apiServer + '/users/register';
    const header = { headers };

    return this.http.post(url, user, header).pipe(map((res) => res));
  }

  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = this.apiServer + '/users/auth';
    const header = { headers };

    return this.http.post(url, user, header).pipe(map((res) => res));
  }

  login(name: string, password: string): Observable<any> {
    this.url = this.apiServer + '/users/login';

    const result = this.http.post<any>(this.url, {
      name,
      password,
    });

    return result;
  }

  authUser(): Observable<boolean> {
    let token: string;
    this.url = this.apiServer + '/users/auth';

    if (typeof localStorage !== 'undefined') {
      token = localStorage.token ? localStorage.token : '';
    }

    return this.http.post<boolean>(this.url, { token });
  }

  getProfile() {
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', this.getToken());

    const url = this.apiServer + '/users/profile';
    const header = { headers };

    return this.http.get(url, header).pipe(map((res: any) => res));
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
