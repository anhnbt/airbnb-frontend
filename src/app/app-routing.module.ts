import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HostsUploadComponent} from './views/hosts-upload/hosts-upload.component';
import {CreatePostComponent} from './views/create-post/create-post.component';

const routes: Routes = [
  { path: 'upload', component: HostsUploadComponent },
  { path: 'create-post', component: CreatePostComponent }
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
