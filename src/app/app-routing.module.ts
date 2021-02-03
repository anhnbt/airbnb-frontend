import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HostsUploadComponent} from './views/hosts-upload/hosts-upload.component';
import {ListHomeComponent} from './views/list-home/list-home.component';

const routes: Routes = [
  { path: 'listhome', component: ListHomeComponent },
  { path: 'upload', component: HostsUploadComponent }
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
