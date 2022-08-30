import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	constructor(private readonly router: Router,) { }

	ngOnInit(): void {

	}

	openDP(){
		if(localStorage.getItem('userData')){
			$(".openDropdown").toggle();
		}else{
			this.router.navigate(['/login']);
			$(".openDropdown").hide();
		}
	}
	openUploadImg(){
		if(localStorage.getItem('userData')){
			this.router.navigate(['/upload-images']);
		}else{
			this.router.navigate(['/login']);
		}
	}
	logOutApp(){
		$(".openDropdown").hide();
		localStorage.removeItem("userData");
		this.router.navigate(['/']);
	}
}
