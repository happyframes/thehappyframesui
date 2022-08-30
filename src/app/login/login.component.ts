import { Component, OnInit } from '@angular/core';
import { FramesService } from '../services/frames.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	emailCode: boolean = false;
	loginForm: FormGroup;
	submitted : boolean = false;
	otpForm: FormGroup;
	submittedOTP : boolean = false;
	loadingLogin: boolean = false;
	invalidOTP: boolean = false;

	constructor(private readonly framesService: FramesService, 
		private formBuilder: FormBuilder, private readonly router: Router,) { }

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
        });
        this.otpForm = this.formBuilder.group({
			otp: ['', Validators.required],
        });
	}
	get f() { return this.loginForm.controls; }
	get fo() { return this.otpForm.controls; }

	submitHFLogin() {
		this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loadingLogin = true;
        this.loginFunc();
	}
	backLogin(){
		this.emailCode = false;
	}
	loginFunc() {
	    this.framesService.login({"email": this.loginForm.value.email}).subscribe((response: any) => {
	      console.log("response", response)
	      this.emailCode = true;
	      this.loadingLogin = false;
	    }, (error: any) => {
	    	console.log('error', error)
	    	this.loadingLogin = false;
	    });
 	}
 	submitOTP(){
 		this.invalidOTP = false;
 		this.submittedOTP = true;
        if (this.otpForm.invalid) {
            return;
        }
        this.otpFunc();
 	}
 	otpFunc() {
	    this.framesService.otp({"email": this.loginForm.value.email, "otp": this.otpForm.value.otp}).subscribe((response: any) => {
	      	console.log('response', response, response.data[0])
	      	localStorage.setItem('userData', JSON.stringify(response.data[0]));
	      	this.router.navigate(['/upload-images']);
	      	this.invalidOTP = false;
	    }, (error: any) => {
	    	console.log('error', error.error.error_msg);
	    	this.invalidOTP = true;
	    	setTimeout(() => {
		        this.invalidOTP = false;
		    }, 3000);
	    });
 	}

}
