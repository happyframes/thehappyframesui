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
    this.framesService.myorders({"email": userdata.email}).subscribe((response: any) => {
      console.log("response", response.data)
      this.myOrders = response.data;
      this.loaderData = false;
      // setTimeout(function(){
      //   $('#myorders').DataTable();
      // },3000)
      if(this.myOrders.length != 0){
      	this.noData = false;
      }
    }, (error: any) => {
    	console.log('error', error)
      this.loaderData = false;
    });
  }

}
