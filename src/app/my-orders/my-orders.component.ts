import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FramesService } from '../services/frames.service';

declare var $: any;

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyOrdersComponent implements OnInit {
	myOrders: any = [];
	noData: boolean = true;
  loaderData: boolean = true;
  constructor(private readonly framesService: FramesService) { }

  ngOnInit(): void {
  	let userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    if(userdata.is_staff){
      this.framesService.allorders({"email": userdata.email}).subscribe((response: any) => {
        if(response.message === "No orders"){
          this.loaderData = false;
        }else{
          this.myOrders = response.data;
        }
        if(this.myOrders.length != 0){
          this.noData = false;
        }
      }, (error: any) => {
        this.loaderData = false;
        this.noData = false;
      });
    }else{
      this.framesService.myorders({"email": userdata.email}).subscribe((response: any) => {
        if(response.message === "No orders"){
          this.loaderData = false;
        }else{
          this.myOrders = response.data;
        }
        if(this.myOrders.length != 0){
          this.noData = false;
        }
      }, (error: any) => {
        this.loaderData = false;
        this.noData = false;
      });
    }

  }

}
