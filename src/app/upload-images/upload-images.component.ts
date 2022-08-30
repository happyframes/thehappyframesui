import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
declare var $: any;


@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

	apikey: string = '';
	uploadImagesList: any = [];
	uploadImagesListOrginal: any = [];
	uploadRes: any = [];
	frameSelect: string = 'White';
	openLowImage: boolean = false;
	openRightModal: boolean = false;
	indexValue :number = 0;
	indexValue2: number = 0;
	selectedImg: string = '';
	addressForm: FormGroup;
	submitted = false;
	minTile: boolean = false;
	addAdress: boolean = false;
	totalAmt : number = 999;
	envUrl : any = environment;
	imageChangedEvent: any = '';
    croppedImage: string = '';
    storeImage: any = [];
    openLoader: boolean = false;
    cropLoader: boolean = false;

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
		this.apikey = this.envUrl.filestackApiKey;
		
	}

	get f() { return this.addressForm.controls; }

	onSubmit() {
		this.submitted = true;
        if (this.addressForm.invalid) {
            return;
        }

    }

    cropUploadImage(url: any) {
    	$("#demo-basic").empty();
    	$("#demo-basic").removeClass('croppie-container');
        var $w = $('.basic-width'),
            $h = $('.basic-height'),
            basic = $('#demo-basic').croppie({
            viewport: {
                width: 250,
                height: 250
            },
            boundary: {
                width: 300,
                height: 300
            }
        });
        basic.croppie('bind', {
            url: url,
        });
        setTimeout(()=>{  
		    let w = parseInt($w.val(), 10),
                h = parseInt($h.val(), 10),
                size = 'viewport';
            basic.croppie('result', {
                type: 'canvas',
                resultSize: {
                    width: 50,
                    height: 50
                }
            }).then((resp: any)=>{ 
            	let objetImage = resp;
            	let uploadObj = {
					filename: this.uploadRes.filesUploaded[0].filename,
					url: resp,
					size: this.uploadRes.filesUploaded[0].size,
					id: ++this.indexValue
				}
				this.uploadImagesList.push(uploadObj);
				this.openLoader = false;
            });		
		}, 2000);
    }

    cropUploadImage2(url: any, indexNumber:any) {
        var $w = $('.basic-width'),
            $h = $('.basic-height'),
            basic = $('#crop-basic').croppie({
            viewport: {
                width: 250,
                height: 250
            },
            boundary: {
                width: 300,
                height: 300
            }
        });
        basic.croppie('bind', {
            url: url,
        });
		$('.basic-result').off().on('click', () => {
			console.log("this.uploadImagesList", this.uploadImagesList)
			this.cropLoader = true;
			setTimeout(()=>{  
	            var w = parseInt($w.val(), 10),
	                h = parseInt($h.val(), 10),
	                size = 'viewport';
	            basic.croppie('result', {
	                type: 'canvas',
	                
	                resultSize: {
	                    width: 50,
	                    height: 50
	                }
	            }).then((resp: any)=>{

	                this.uploadImagesList.forEach((obj: any, indexValue: any) => {
			    		if(obj.id === indexNumber){
			    			console.log("indexValue", indexValue)
							this.uploadImagesList[indexValue].url = resp;
							$('#cropModal').modal('hide');
							this.cropLoader = false;
			    		}
			      	});
	            });
            }, 2000);
        });
    }

    cropFC(indexNumber: any){
    	$("#crop-basic").empty();
    	$("#crop-basic").removeClass('croppie-container');
	 	$('#cropModal').modal('show');
    	setTimeout(()=>{  
    	this.uploadImagesListOrginal.forEach((obj: any) => {
    		if(obj.id === indexNumber){
				this.cropUploadImage2(obj.url, indexNumber);
    		}
      	});
      	}, 1000);
    }
	onUploadSuccess(res: object) {
		this.uploadRes = res;
		let uploadObj = {
			filename: this.uploadRes.filesUploaded[0].filename,
			url: this.uploadRes.filesUploaded[0].url,
			size: this.uploadRes.filesUploaded[0].size,
			id: ++this.indexValue2
		}
		this.uploadImagesListOrginal.push(uploadObj);
		const fsize = this.uploadRes.filesUploaded[0].size;
        const file = Math.round((fsize / 1024));
        if(file < 300){
        	this.windowScroolUp();
        	this.openLowImage = true;
        	this.selectedImg = this.uploadRes.filesUploaded[0].url;
        }else{
        	this.openLowImage = false;
        }
        this.cropUploadImage(this.uploadRes.filesUploaded[0].url);
        this.openLoader = true;
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
		if(frameSelectString === 'White-Bold' || frameSelectString === 'Black-Bold' || frameSelectString === 'Rose-Gold-Bold'){
			$(".add-frame-image").addClass('upload-frames-ui-bold');
			$(".add-frame-image").removeClass('upload-frames-ui');
		}else{
			$(".add-frame-image").addClass('upload-frames-ui');
			$(".add-frame-image").removeClass('upload-frames-ui-bold');
		}
		
	}
	deleteImg(indexNumber: any){
		let index = this.uploadImagesList.findIndex(function(o: any){
		     return o.id === indexNumber;
		});
		if (index !== -1) this.uploadImagesList.splice(index, 1);
	}
	mouseEnter(id : string, id2: string){
      $('.'+id).addClass('block');
      $('.'+id).removeClass('none');
      $('.frame'+id2).css("filter", "brightness(0.50)");
	  
   }
    mouseLeave(id : string, id2: string){
     $('.'+id).removeClass('block');
     $('.'+id).addClass('none');
     $('.frame'+id2).css("filter", "none");
   }
   checkOut(){
   		this.windowScroolUp();
   		if(this.uploadImagesList.length < 3){
   			this.minTile = true;
   		}else{
			this.openRightModal = true;
			let amountAdd = this.uploadImagesList.length - 3;
			if(amountAdd != 0){
				let totalAmtMultiPly = amountAdd*300;
				this.totalAmt = this.totalAmt + totalAmtMultiPly;
			}
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
