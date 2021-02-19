import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {RoomImages} from '../../models/roomImages';
import {RoomService} from '../../services/room.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BookingListComponent} from '../booking-list/booking-list.component';

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

  sortStatus = true;

  displayedColumns: string[] = ['id', 'roomName', 'createdDate', 'startDate', 'endDate', 'status', 'price', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,
              private roomService: RoomService,
  ) {
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
          this.dataSource = new MatTableDataSource(this.bookings);
          this.dataSource.paginator = this.paginator;
        });
      });
    });
  }

  changeStatus(id: number): any {
    this.roomService.changeStatus(id).subscribe(res => {
      this.getData();
    });
  }

  sort(key: any): void {
    if (this.sortStatus) {
      this.bookings.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    } else {
      this.bookings.reverse();
    }
    this.dataSource = new MatTableDataSource(this.bookings);
    this.dataSource.paginator = this.paginator;
    this.sortStatus = !this.sortStatus;
  }
}
