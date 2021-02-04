import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HostsUploadComponent} from './views/hosts-upload/hosts-upload.component';
import {LayoutLoginComponent} from './layout-login/layout-login.component';
import {LayoutComponent} from './views/layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent},
  { path: 'upload', component: HostsUploadComponent },
  { path: 'login', component: LayoutLoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
