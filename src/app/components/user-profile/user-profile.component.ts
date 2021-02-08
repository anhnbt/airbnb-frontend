import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Timestamp} from 'rxjs';
import {Room} from '../../models/room';
import {RoomService} from '../../services/room.service';

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
    createdDate: null,
    updatedAt: null,
  };
  // user: any;
  roomsOfHost = [];
  bookings = [];
  imagesRoom: any[] = [];

  constructor(private userService: UserService,
              private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.userService.getOne(1).subscribe((res: any) => {
      this.user = res.data;
      this.userService.getRoomsOfHost(1).subscribe((res: any) => {
        this.roomsOfHost = res.data;
        for (const room of this.roomsOfHost) {
          for (const img of room.roomImages) {
            this.imagesRoom.push(img);
            console.log(this.imagesRoom);
          }
        }
        this.userService.getBookingsOfUser(1).subscribe((res: any) => {
          this.bookings = res.data;
        });
      });
    });
  }

  changeStatus(id: number): any {
    this.roomService.changeStatus(id).subscribe(res => {
      this.ngOnInit();
    });
  }
}
