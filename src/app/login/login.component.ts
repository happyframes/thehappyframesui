import { Component, OnInit } from '@angular/core';
import { FramesService } from '../services/frames.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	emailCode: boolean = false;

	constructor(private readonly framesService: FramesService) { }

	ngOnInit(): void {
		this.loginFunc();
	}

	submitHFLogin() {
		this.emailCode = true;
	}
	backLogin(){
		this.emailCode = false;
	}
	loginFunc() {
	    this.framesService.login({"email": "ncsvsmanohar@gmail.com"}).subscribe((response: any) => {
	      console.log("response", response)
	    }, (error: any) => {
	    	console.log('error', error)
	    });
 	}

}
