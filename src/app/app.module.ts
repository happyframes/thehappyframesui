import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { FilestackModule } from '@filestack/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadImagesComponent,
    GiftCardComponent,
    HeaderComponent,
    FooterComponent,
    MyOrdersComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    ShippingPolicyComponent,
    TermsConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FilestackModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
