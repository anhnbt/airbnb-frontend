import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {UserService} from '../../services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit, AfterViewInit {
  rooms = [];
  bookings = [];
  sortStatus = true;

  bookingsOfCus = [];

  constructor(private bookingService: BookingService,
              private userService: UserService) {
  }

  displayedColumns: string[] = ['id', 'cusName', 'roomName', 'createdDate', 'startDate', 'endDate', 'status', 'price', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): any {
  }

  ngOnInit(): void {
    this.bookingService.getAll().subscribe(res => {
      this.bookings = res;
      this.userService.getRoomsOfHost(1).subscribe(res => {
        this.rooms = res.data.content;
        for (const b of this.bookings) {
          b.price = b.numNight * b.room.pricePerNight;
          for (const r of this.rooms) {
            if (r.id === b.room.id) {
              this.bookingsOfCus.push(b);
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.bookingsOfCus);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  sort(key: any): void {
    if (this.sortStatus) {
      // this.bookingsOfCus.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : ((b.createdDate > a.createdDate) ? -1 : 0));
      this.bookingsOfCus.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    } else {
      this.bookingsOfCus.reverse();
    }
    this.dataSource = new MatTableDataSource(this.bookingsOfCus);
    this.dataSource.paginator = this.paginator;
    this.sortStatus = !this.sortStatus;
  }

}
