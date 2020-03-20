import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = 'http://localhost:3000/users/register';
    const header = { headers };

    return this.http.post(url, user, header).pipe(map(res => res));
  }

  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = 'http://localhost:3000/users/auth';
    const header = { headers };

    return this.http.post(url, user, header).pipe(map(res => res));
  }

  getProfile() {
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', this.getToken());

    const url = 'http://localhost:3000/users/profile';
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
