import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Timestamp} from 'rxjs';
import {Room} from '../../models/room';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user = {
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
  // user: any;
  roomsOfHost = [];
  bookings = [];

  imagesUrl = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getOne(1).subscribe((res: any) => {
      this.user = res.data;
      console.log(res.data);
      this.userService.getRoomsOfHost(1).subscribe((res: any) => {
        this.roomsOfHost = res.data;
        console.log(this.roomsOfHost);
        this.userService.getBookingsOfUser(1).subscribe((res: any) => {
          this.bookings = res.data;
          console.log(this.bookings);
        });
      });
    });
  }

}
