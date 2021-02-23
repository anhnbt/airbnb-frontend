import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookingService} from 'src/app/services/booking.service';
import {AuthService} from '../../services/auth.service';
import {DialogContentComponent} from '../layout/dialog-content/dialog-content.component';
import {RoomImages} from '../../models/roomImages';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  id: number;
  myForm = this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    numberOfGuests: [1, Validators.required],
    numberOfChildren: [0, Validators.required],
    numberOfInfants: [0, Validators.required],
  });

  roomData: Room = {};
  images: RoomImages[] = [{
    imageUrl: '',
  }];

  totalNights = 0;
  total = 0;

  myFilterStart = (d: Date | null): boolean => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const selectedDate = (d || new Date());
    return selectedDate > yesterday;
  }

  myFilterEnd = (d: Date | null): boolean => {
    const currentDate = new Date();
    const selectedDate = (d || new Date());
    return selectedDate > currentDate && selectedDate > this.startDate.value;
  }

  constructor(
    public authService: AuthService,
    private bookingService: BookingService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(this.id).subscribe((res: any) => {
      this.roomData = res.data;
      if (res.data.roomImages.length > 0) {
        this.images[0].imageUrl = res.data
          .roomImages[0].imageUrl;
      } else {
        this.images[0].imageUrl = 'https://via.placeholder.com/350x150';
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }

  get startDate(): AbstractControl {
    return this.myForm.get('startDate');
  }

  get endDate(): AbstractControl {
    return this.myForm.get('endDate');
  }

  get numberOfGuests(): AbstractControl {
    return this.myForm.get('numberOfGuests');
  }

  get numberOfChildren(): AbstractControl {
    return this.myForm.get('numberOfChildren');
  }

  get numberOfInfants(): AbstractControl {
    return this.myForm.get('numberOfInfants');
  }

  get guestCount(): number {
    return (this.numberOfGuests.value + this.numberOfChildren.value);
  }

  onChangeStartDate(): void {
    this.endDate.setValue(null);
  }

  increment(input: AbstractControl): void {
    input.setValue(input.value + 1);
  }

  decrement(input: AbstractControl): void {
    input.setValue(input.value - 1);
  }

  convertUTCDateToLocalDate(date): Date {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  }

  onSubmit(): void {
    if (!this.authService.checkAuthenticated()) {
      const dialogRef = this.dialog.open(DialogContentComponent, {
        width: '300px',
        data: {
          title: 'Cảnh báo',
          content: 'Bạn cần đăng nhập để có thể đặt phòng',
          confirm: 'Đăng nhập',
          close: 'Hủy'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['/login']);
        }
      });
    } else {
      if (this.roomData.status) {
        const localStartDate = this.convertUTCDateToLocalDate(this.startDate.value);
        const localEndDate = this.convertUTCDateToLocalDate(this.endDate.value);
        this.startDate.setValue(new Date(localStartDate));
        this.endDate.setValue(new Date(localEndDate));
        const userId = this.authService.getLocal().id;
        this.bookingService.booking(this.roomData.id, userId, this.myForm.value).subscribe(res => {
          console.log(res);
          if (res.status === 'OK') {
            this.openSnackBar('Đặt phòng thành công!', 'Đóng');
            this.myForm.reset();
          } else {
            this.openSnackBar('Đã xảy ra lỗi: ' + res.message, 'Đóng');
          }
        });
      } else {
        this.openSnackBar('Phòng này đã có người đang ở! Vui lòng chọn phòng khác.', 'Đóng');
      }
    }
  }

  calculate(): void {
    this.totalNights = this.endDate.value.getDate() - this.startDate.value.getDate();
    this.total = this.totalNights * this.roomData.pricePerNight;
  }

}
