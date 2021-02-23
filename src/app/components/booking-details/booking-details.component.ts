import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentComponent} from '../layout/dialog-content/dialog-content.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {BookingService} from '../../services/booking.service';
import {Room} from '../../models/room';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  booking: any;
  room: Room = {};
  roomImages = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.bookingService.getOne(id).subscribe((res: any) => {
      this.booking = res;
      this.room = res.room;
      if (res.room.roomImages.length > 0) {
        this.roomImages = res.room.roomImages;
      } else {
        this.roomImages.push({imageUrl: 'https://via.placeholder.com/350x150'});
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  openConfirmDialog(): void {
    const startDate = new Date(this.booking.startDate).getDate();
    const cancelledDate = new Date().getDate();
    if (cancelledDate < startDate) {
      if (this.room.cancelled && cancelledDate === (startDate - 1)) {
        this.openSnackBar('Bạn không thể hủy đặt phòng trước 1 ngày', 'Close');
      } else {
        const dialogRef = this.dialog.open(DialogContentComponent, {
          width: '300px',
          data: {
            title: 'Xác nhận',
            content: 'Bạn có muốn hủy đặt phòng này?',
            confirm: 'Xác nhận',
            close: 'Hủy'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.bookingService.cancelled(this.booking.id).subscribe(res => {
              this.openSnackBar('Hủy đặt phòng thành công!', 'Close');
              this.ngOnInit();
            });
          }
        });
      }
    } else {
      this.openSnackBar('Quá hạn hủy đặt phòng. Bạn có muốn trả phòng?', 'Close');
    }
  }
}
