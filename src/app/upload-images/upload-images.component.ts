import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

	apikey: string = '';
	uploadImagesList: any = [];
	uploadRes: any = [];
	frameSelect: string = 'White';
	openLowImage: boolean = false;
	openRightModal: boolean = false;
	indexValue :number = 0;
	selectedImg: string = '';
	addressForm: FormGroup;
	submitted = false;
	minTile: boolean = false;
	addAdress: boolean = false;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.addressForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
            fullName: ['', Validators.required],
            address1: ['', Validators.required],
            address2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipcode: ['', Validators.required],
            country: ['', Validators.required],
            phoneNumber: ['', Validators.required],
        });
		this.apikey = environment.filestackApiKey;
	}

	get f() { return this.addressForm.controls; }

	onSubmit() {
		// console.log("this.addressForm",this.addressForm, this.addressForm.value);
		this.submitted = true;
        if (this.addressForm.invalid) {
            return;
        }

    }

	onUploadSuccess(res: object) {
		this.uploadRes = res;
		let uploadObj = {
			filename: this.uploadRes.filesUploaded[0].filename,
			url: this.uploadRes.filesUploaded[0].url,
			size: this.uploadRes.filesUploaded[0].size,
			id: ++this.indexValue
		}
		this.uploadImagesList.push(uploadObj);
		const fsize = this.uploadRes.filesUploaded[0].size;
        const file = Math.round((fsize / 1024));
        if(file < 300){
        	this.windowScroolUp();
        	this.openLowImage = true;
        	this.selectedImg = this.uploadRes.filesUploaded[0].url;
        }else{
        	this.openLowImage = false;
        }
	}
	keepAnyway(){
		this.openLowImage = false;
	}
	removeOrder(){
		let indexNumber = this.indexValue;
		let index = this.uploadImagesList.findIndex(function(o: any){
		     return o.id === indexNumber;
		});
		if (index !== -1) this.uploadImagesList.splice(index, 1);
		this.openLowImage = false;
	}

	onUploadError(err: any) {
	}
	frameList(frameSelectString: string){
		this.frameSelect = frameSelectString;
	}
	deleteImg(indexNumber: any){
		let index = this.uploadImagesList.findIndex(function(o: any){
		     return o.id === indexNumber;
		});
		if (index !== -1) this.uploadImagesList.splice(index, 1);
	}
	mouseEnter(id : string){
      $('.'+id).addClass('block');
      $('.'+id).removeClass('none');
   }
    mouseLeave(id : string){
     $('.'+id).removeClass('block');
     $('.'+id).addClass('none');
   }
   checkOut(){
   		this.windowScroolUp();
   		if(this.uploadImagesList.length < 3){
   			this.minTile = true;
   		}else{
			this.openRightModal = true;
   		}
   		setTimeout(() => {
	        this.minTile = false;
	    }, 3000);
   }
   plcaeOrder(){
   		if(this.addressForm.invalid){
   			this.addAdress = true;
   		}
   		setTimeout(() => {
	        this.addAdress = false;
	    }, 3000);
   }
   closeRightModal(){
   		this.openRightModal = false;
   }
   windowScroolUp(){
	   	window.scroll({ 
	       top: 0, 
	       left: 0, 
	       behavior: 'smooth' 
		});
   }
}
