import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
	errorMsg : string = '';

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.queryParams
	      .subscribe(params => {
	        console.log(params);
	        this.errorMsg = params.errorMessage;
	      }
	    );
	}

}
