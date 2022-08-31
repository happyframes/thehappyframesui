import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isLoading = new BehaviorSubject(false);
  envUrl : any = environment;

  constructor(private readonly http: HttpClient) { }

  get(path: string): Observable<any> {
    const url = this.envUrl.apiUrl + path;
    return this.http.get(url);
  }

  delete(path: string): Observable<any> {
    const url = this.envUrl.apiUrl + path;
    return this.http.delete(url);
  }

  post(path: string, body: any): Observable<any> {
    const url = this.envUrl.apiUrl + path;
    console.log("url", url)
    return this.http.post(url, body);
  }

  put(path: string, body: any): Observable<any> {
    const url = this.envUrl.apiUrl + path;
    return this.http.put(url, body);
  }
}
