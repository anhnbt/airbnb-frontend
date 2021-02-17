import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  rooms = [];
  bookings = [];
  sortStatus = true;

  bookingsOfCus = [];

  constructor(private bookingService: BookingService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.bookingService.getAll().subscribe(res => {
      this.bookings = res;
      this.userService.getRoomsOfHost(1).subscribe(res => {
        this.rooms = res.data;
        for (const b of this.bookings) {
          for (const r of this.rooms) {
            if (r.id === b.room.id) {
              this.bookingsOfCus.push(b);
            }
          }
        }
      });
    });
  }

  sort(key: any): any {
    if (this.sortStatus) {
      // this.bookingsOfCus.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : ((b.createdDate > a.createdDate) ? -1 : 0));
      this.bookingsOfCus.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    } else {
      this.bookingsOfCus.reverse();
    }
    this.sortStatus = !this.sortStatus;
  }

}
