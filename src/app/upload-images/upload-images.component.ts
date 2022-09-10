import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { FramesService } from '../services/frames.service';
declare var $: any;


@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css'],
})
export class UploadImagesComponent implements OnInit {

	apikey: string = 'AOXdUH200TsO1dl21Qikez';
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
  totalAmtWithGST: number = 0;
	envUrl : any = environment;
	imageChangedEvent: any = '';
    croppedImage: string = '';
    storeImage: any = [];
    openLoader: boolean = false;
    cropLoader: boolean = false;

	constructor(private formBuilder: FormBuilder, private readonly framesService: FramesService,) { }

	ngOnInit() {
		this.addressForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
            fullName: ['', Validators.required],
            address1: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipcode: ['', Validators.required],
            country: ['', Validators.required],
            phoneNumber: ['', Validators.required],
        });	
	}

  checkOutService() {
    let userdata = JSON.parse(localStorage.getItem('userData') || '{}');
    let resultImgArray = this.uploadImagesList.map((a: any) => a.url);
    console.log("resultImgArray", resultImgArray)
    let addressData = {
      'address1': this.addressForm.value.address1,
      'address2': this.addressForm.value.address2,
      'city': this.addressForm.value.city,
      'state': this.addressForm.value.state,
      'pin': this.addressForm.value.zipcode,
    }
    var orderData = {
          "email": userdata.email,
          "full_name": this.addressForm.value.fullName,
          "mobile": this.addressForm.value.phoneNumber,
          "address": JSON.stringify(addressData),
          "photos": resultImgArray,
          "tile": this.frameSelect,
          "order_total": this.totalAmtWithGST,
          "is_paid": false
      }
      console.log("orderData", orderData)
      this.framesService.checkout(orderData).subscribe((response: any) => {
        console.log("response", response);
        var paytmData = {
            "order_id": response.data[0].order_id,
            "order_total": response.data[0].order_total,
            "email": userdata.email
        }
        this.framesService.paytmCheckout(paytmData).subscribe((response: any) => {
          console.log("response fro pay", response)
          this.handleSuccess(response.data);
        }, (error: any) => {
          console.log('error pay', error)
        });
      }, (error: any) => {
        console.log('error', error)
      });
  } 

  handleSuccess = (res: any) => {
    console.log('res', res);
    let keyArr = Object.keys(res);
    let valArr = Object.values(res);
    console.log('res', keyArr, valArr);
    const my_form: any = document.createElement('form');
    my_form.name = 'paytm_form';
    my_form.method = 'post';
    my_form.action = 'https://securegw-stage.paytm.in/order/process';

    keyArr.map((k, i) => {
      // create an input element
      let inp: any = document.createElement("input");
      inp.key = i;
      inp.type = "hidden";
      // input tag's name should be a key of param_dict
      inp.name = k;
      // input tag's value should be a value associated with the key that we are passing in inp.name
      inp.value = valArr[i];
      // append those all input tags in the form tag
      my_form.appendChild(inp);
    });

    document.body.appendChild(my_form);
    my_form.submit();
  }

	get f() { return this.addressForm.controls; }

	onSubmit() {
		this.submitted = true;
        if (this.addressForm.invalid) {
            return;
        }

    }

    cropUploadImage(url: any) {
      console.log("cropUploadImage", this.frameSelect);

    	$("#demo-basic").empty();
    	$("#demo-basic").removeClass('croppie-container');
        var $w = $('.basic-width'),
            $h = $('.basic-height'),
            basic = $('#demo-basic').croppie({
            viewport: {
                width: 500,
                height: 500
            },
            boundary: {
                width: 300,
                height: 300
            }
        });
        basic.croppie('bind', {
            url: url,
        });

        
        var data = setInterval(() => {
          var findimage = $('.cr-image').attr('src');
          console.log('dd', findimage);
          if(findimage){
            clearInterval(data);
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
              console.log("resp", resp)
              let uploadObj = {
                filename: this.uploadRes.filesUploaded[0].filename,
                url: resp,
                size: this.uploadRes.filesUploaded[0].size,
                id: ++this.indexValue
              }
              this.uploadImagesList.push(uploadObj);
              this.openLoader = false;
              setTimeout(() => {
                this.frameList(this.frameSelect);
              }, 100);
            });
          }
        }, 1000);

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
	                size = { width: 500, height: 500 };
	            basic.croppie('result', {
	                type: 'canvas',
	                size: size,
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
  percentage(num: any, per: any){
    return (num/100)*per;
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
          let gstValue = this.percentage(this.totalAmt, 18);
          this.totalAmtWithGST = this.totalAmt + gstValue;
  			}else{
          this.totalAmt = 999;
          let gstValue = this.percentage(this.totalAmt, 18);
          this.totalAmtWithGST = this.totalAmt + gstValue;
        }
   		}
   		setTimeout(() => {
	        this.minTile = false;
	    }, 3000);
   }
   plcaeOrder(){
   		if(this.addressForm.invalid){
   			this.addAdress = true;
   		}else{
        this.checkOutService();
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
