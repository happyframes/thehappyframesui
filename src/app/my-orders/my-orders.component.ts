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
  constructor(private readonly framesService: FramesService) { }

  ngOnInit(): void {
  	$('#myorders').DataTable();
    this.framesService.myorders({"email": 'ncsvsmanohar77@gmail.com'}).subscribe((response: any) => {
      console.log("response", response.data)
      this.myOrders = response.data;
      if(this.myOrders.length != 0){
      	this.noData = false;
      }
    }, (error: any) => {
    	console.log('error', error)
    });
  }

}
