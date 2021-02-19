import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user = {
    id: 4,
    createdDate: null,
    modifiedDate: null,
    name: '',
    username:'',
    email: '',
    password: '',
    gender: 0,
    dateOfBirth: null,
    phone: null,
    active: true,
    roles: [],
  };
  username= localStorage.key(0);
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getOneByUsername(this.username).subscribe(res=>{
      console.log(res.data),
        this.user = res.data
    })
  }

}
