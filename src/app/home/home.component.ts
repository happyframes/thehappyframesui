import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }
  openUploadImg(){
		if(localStorage.getItem('userData')){
			this.router.navigate(['/upload-images']);
		}else{
			this.router.navigate(['/login']);
		}
	}

}
