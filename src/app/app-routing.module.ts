import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { UsersGuard } from './users.guard';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'upload-images', component: UploadImagesComponent, canActivate: [ UsersGuard ] },
];
// canActivate: [ UsersGuard ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
