import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Timestamp} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    gender: 0,
    dateOfBirth: null,
    phone: '',
    active: null,
    createdAt: null,
    updatedAt: null,
  };
  roomsOfHost: [];
  imagesUrl = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getOne(1).subscribe((res: any) => {
      this.user = res.data;
      this.roomsOfHost = res.data.rooms;
      console.log(this.user);
    });
  }

}
