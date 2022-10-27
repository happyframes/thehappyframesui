import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FramesService } from '../services/frames.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  staff: boolean = true;
  paginationNumber: number = 1;
  num_pages: number = 0; 
  orderStatusForm: FormGroup;
  orderStatusItems: any[] = [
    { value: 'Ordered', viewValue: 'Ordered' },
    { value: 'Order Processing', viewValue: 'Order Processing' },
    { value: 'Order Confirmed', viewValue: 'Order Confirmed' },
    { value: 'Shipped', viewValue: 'Shipped' },
    { value: 'Delivered', viewValue: 'Delivered' },
    { value: 'Cancelled', viewValue: 'Cancelled' },
    { value: 'Refund Initiated', viewValue: 'Refund Initiated' },
    { value: 'Refund Completed', viewValue: 'Refund Completed' }
  ];
  constructor(private formBuilder: FormBuilder, private readonly framesService: FramesService) { }

  ngOnInit(): void {
    this.orderStatusForm = this.formBuilder.group({
      orderStatus: [],
    }); 
  	let userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    this.staff = userdata.is_staff;
    if(userdata.is_staff){
      this.is_staffFc();
    }else{
      this.is_normalFc();
    }
  }
  onChange(selectedValue: any, index: any, orderID: any) {
    let userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    let orderStausAPI = {
      "order_id": orderID, 
      "order_status": selectedValue, 
      "email": userdata.email
    }
    console.log("orderStausAPI", orderStausAPI);
    this.framesService.handlePayment(orderStausAPI).subscribe((response: any) => {
      console.log("response", response);
      alert(response.data+ ' - '+orderID+ ' Order Id');
    }, (error: any) => {
      console.log("error", error)
    });
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
          this.myOrders.forEach((obj: any) => {
            this.orderStatusForm.controls['orderStatus'].setValue(obj.order_status, {onlySelf: true});
          });
          
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
