import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FramesService {

  constructor(private readonly apiService: ApiService) { }
  login(payload: any): Observable<any> {
    const url = 'https://thehappyframes.com/api/loginApp/register/';
    return this.apiService.post(url, payload);
  }
  otp(payload: any): Observable<any> {
    const url = 'https://thehappyframes.com/api/loginApp/verify_otp/';
    return this.apiService.post(url, payload);
  }
  myorders(payload: any): Observable<any> {
    const url = 'https://thehappyframes.com/api/orders/my_orders/';
    return this.apiService.post(url, payload);
  }
  allorders(id: any, payload: any): Observable<any> {
    const url = 'https://thehappyframes.com/api/orders/all_orders/'+id+'/';
    return this.apiService.post(url, payload);
  }
  checkout(payload: any): Observable<any> {
    const url = 'https://thehappyframes.com/api/orders/photos/';
    return this.apiService.post(url, payload);
  }
  paytmCheckout(payload: any): Observable<any> {
    const url = 'https://thehappyframes.com/api/paytm_payment/pay/';
    return this.apiService.post(url, payload);
  }
}
