import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPassword } from '../models/password';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  passwords: IPassword[] = [];

  getAll(): Observable<IPassword[]> {
    return this.http
      .get<IPassword[]>('https://localhost:7095/Password')
      .pipe(tap((passwords) => (this.passwords = passwords)));
  }

  create(password: IPassword): Observable<IPassword> {
    return this.http.post<IPassword>(
      'https://localhost:7095/Password',
      password
    );
  }

  delete(id: number | undefined): Observable<IPassword> {
    return this.http.delete<IPassword>(
      'https://localhost:7095/Password' + '/' + id
    );
  }

  update(password: IPassword, id: number | undefined): Observable<IPassword> {
    return this.http.put<IPassword>(
      'https://localhost:7095/Password' + '/' + id,
      password
    );
  }
}
