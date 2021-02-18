import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {RoomImages} from '../../models/roomImages';
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
  roomsOfHost = [];
  bookings = [];
  imagesRoom: RoomImages[] = [{
    imageUrl: ''
  }];
  pagingRooms;
  page = 0;
  size = 8;

  constructor(private userService: UserService,
              private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.userService.getOne(1).subscribe((res: any) => {
      this.user = res.data;
      this.userService.getRoomsOfHost(this.user.id, this.page, this.size).subscribe((res: any) => {
        this.pagingRooms = res.data;
        this.roomsOfHost = res.data.content;
        this.imagesRoom = this.roomsOfHost[0].roomImages;
        this.userService.getBookingsOfUser(this.user.id).subscribe((res: any) => {
          this.bookings = res.data;
        });
      });
    });
  }

  changeStatus(id: number): any {
    this.roomService.changeStatus(id).subscribe(res => {
      this.getData();
    });
  }
}
