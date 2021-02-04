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
  roomsOfHost: Room[] = [];
  bookings = [];
  totalMoney = [];
  money: number;
  imagesUrl = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getOne(1).subscribe((res: any) => {
      this.user = res.data;
      this.roomsOfHost = res.data.rooms;
      this.bookings = res.data.bookings;

      // for (const b of this.bookings) {
      //   this.money = b.endDate.getDate() - b.startDate.getDate();
      //   console.log(this.money);
      // }
    });
  }

}
