import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {UserService} from '../../services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit, AfterViewInit {
  sortStatus = true;

  bookingsOfCus = [];

  constructor(private bookingService: BookingService,
              private authService: AuthService) {
  }

  displayedColumns: string[] = ['id', 'cusName', 'roomName', 'createdDate', 'startDate', 'endDate', 'status', 'price', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): any {
  }

  ngOnInit(): void {
    const userLocal = this.authService.getLocal();
    this.bookingService.bookingsOfCus(userLocal.id).subscribe(res => {
      this.bookingsOfCus = res.data;
      this.dataSource = new MatTableDataSource(this.bookingsOfCus);
      this.dataSource.paginator = this.paginator;
    });
  }

  sort(key: any): void {
    if (this.sortStatus) {
      this.bookingsOfCus.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    } else {
      this.bookingsOfCus.reverse();
    }
    this.dataSource = new MatTableDataSource(this.bookingsOfCus);
    this.dataSource.paginator = this.paginator;
    this.sortStatus = !this.sortStatus;
  }

}
