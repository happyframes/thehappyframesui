import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FramesService {

  constructor(private readonly apiService: ApiService) { }
  login(payload: any): Observable<any> {
    const url = 'loginApp/register/';
    return this.apiService.post(url, payload);
  }
  otp(payload: any): Observable<any> {
    const url = 'loginApp/verify_otp/';
    return this.apiService.post(url, payload);
  }
}
