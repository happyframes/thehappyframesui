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
  count: string = '';
  staff: boolean = false;
  paginationNumber: number = 1;
  num_pages: number = 0; 
  constructor(private readonly framesService: FramesService) { }

  ngOnInit(): void {
  	let userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    this.staff = userdata.is_staff
    if(userdata.is_staff){
      this.is_staffFc();
    }else{
      this.is_normalFc();
    }

  }
  stepFor(){
    console.log("this.paginationNumber", this.paginationNumber++);
    this.is_staffFc();
    this.loaderData = true;;
    this.noData = true;
    this.myOrders = [];
  }
  stepBack(){
    console.log("this.paginationNumber", this.paginationNumber--);
    this.is_staffFc();
    this.loaderData = true;;
    this.noData = true;
    this.myOrders = [];
  }

  is_staffFc(){
    let userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    this.framesService.allorders(this.paginationNumber, {"email": userdata.email}).subscribe((response: any) => {
        if(response.message === "No orders"){
          this.loaderData = false;
        }else{
          this.myOrders = response.data;
          this.count = response.count;
          this.num_pages = response.num_pages;
        }
        if(this.myOrders.length != 0){
          this.noData = false;
          this.loaderData = false;
        }
      }, (error: any) => {
        this.loaderData = false;
        this.noData = false;
      });
  }
  is_normalFc(){
    let userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    this.framesService.myorders({"email": userdata.email}).subscribe((response: any) => {
        if(response.message === "No orders"){
          this.loaderData = false;
        }else{
          this.myOrders = response.data;
        }
        if(this.myOrders.length != 0){
          this.noData = false;
          this.loaderData = false;
        }
      }, (error: any) => {
        this.loaderData = false;
        this.noData = false;
      });
  }

}
