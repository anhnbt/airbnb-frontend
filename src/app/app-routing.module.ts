import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HostsUploadComponent} from './components/hosts-upload/hosts-upload.component';
import {ListHomeComponent} from './components/list-home/list-home.component';
import {RoomDetailsComponent} from './components/room-details/room-details.component';
import {CreatePostComponent} from './components/create-post/create-post.component';

const routes: Routes = [
  { path: 'listhome', component: ListHomeComponent },
  { path: 'rooms/:id', component: RoomDetailsComponent },
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
