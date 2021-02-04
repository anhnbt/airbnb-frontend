import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentComponent} from '../layout/dialog-content/dialog-content.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  myForm = this.fb.group({
    cancelReservationDate: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Submit');
    this.openConfirmDialog();
  }

  get cancelReservationDate(): AbstractControl {
    return this.myForm.get('cancelReservationDate');
  }

  openConfirmDialog(): void {
    if (this.cancelReservationDate.value <= 1) {
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
          this.openSnackBar('Hủy đặt phòng thành công!', 'Close');
        }
      });
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}
