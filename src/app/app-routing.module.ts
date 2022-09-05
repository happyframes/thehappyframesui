import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
import { UsersGuard } from './users.guard';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'upload-images', component: UploadImagesComponent, canActivate: [ UsersGuard ] },
	{ path: 'my-orders', component: MyOrdersComponent, canActivate: [ UsersGuard ] },
	{ path: 'faq', component: FaqComponent },
	{ path: 'privacy-policy', component: PrivacyPolicyComponent },
	{ path: 'terms-conditions', component: TermsConditionsComponent },
	{ path: 'shipping-policy', component: ShippingPolicyComponent },
];
// canActivate: [ UsersGuard ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
