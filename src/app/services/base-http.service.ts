import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseHttpService {

  headers = new HttpHeaders({
    'x-apikey': '5c3f94b966292476821ca01e',
    'content-type': 'application/json',
  });
  baseURL = 'https://marvelheroes-1d22.restdb.io/rest/marvelcards';

  constructor( protected readonly httpClient: HttpClient ) { }

  protected get<TResult>(url: string, params?: any): Observable<TResult> {
    return this.httpClient
      .get<TResult>(this.baseURL+url, {headers: this.headers})
  }

  protected put<TResult>(
    url: string,
    params: any,
    options?: {headers: HttpHeaders}): Observable<TResult> {
    return this.httpClient
      .put<TResult>(this.baseURL+url, params, {headers: this.headers})
      
  }

  protected post<TResult>(
    params: any,
    options?: {headers: HttpHeaders}): Observable<TResult> {
    return this.httpClient
      .post<TResult>(this.baseURL, params, {headers: this.headers})
  }

  protected delete<TResult>(
    url: string,
    options?: {headers: HttpHeaders}): Observable<TResult> {
    return this.httpClient
      .delete<TResult>(this.baseURL+url, {headers: this.headers})
  }



  // getHeroes() {
  //   return this.http.get('https://marvelheroes-1d22.restdb.io/rest/heroes', {headers: this.headers});
  //   // return this.http.get('https://marvelheroes-1d22.restdb.io/rest/heroes?skip=10&max=10', {headers: this.headers});
  // https://marvelheroes-1d22.restdb.io/rest/marvelcards?totals=true&count=true
  // }

  
}
