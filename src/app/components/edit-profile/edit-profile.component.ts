import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';

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
  gender= ''
  constructor(private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getOneByUsername(this.username).subscribe(res=>{
      console.log(res.data),

        this.user = res.data,
        this.checkGender()
    })

    console.log(this.user.gender +'aaaa');
  }
checkGender():void{
  if (this.user.gender==1){
    this.gender = 'Nam'
  }else {
    this.gender ='Nu'
  }
}
}
