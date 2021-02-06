import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  myForm = this.fb.group({
    startDate: [new Date(), Validators.required],
    endDate: [this.addDays(new Date(), 2), Validators.required],
  });

  totalAmount: number;
  totalDay: number;
  totalKhach = 1;
  orderdetails: any = {
    nguoilon: 1,
    treem: 0,
    embe: 0
  };

  room: Room;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  myFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    const selectedDate = d || this.date.value;
    // const nextTwoDate = this.addDays(selectedDate, 2);
    console.log('currentDate: ' + currentDate);
    console.log('selectedDate: ' + selectedDate);
    return currentDate <= selectedDate;
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id).subscribe((res: any) => {
      this.room = res.data;
      console.log(res);
    });
  }

  addDays(dateObj: Date, numDays: number): Date {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  sum(startDate: Date, endDate: Date): number {
    console.log(endDate.getDate() - startDate.getDate());
    this.totalDay = endDate.getDate() - startDate.getDate();
    return this.totalDay * this.room.pricePerNight;
  }

  get startDate(): AbstractControl {
    return this.myForm.get('startDate');
  }

  get endDate(): AbstractControl {
    return this.myForm.get('endDate');
  }

  increment(input: number): void {
    input++;
  }

  decrement(input: number): void {
    input++;
  }

  onSubmit(): void {
    console.log(this.myForm.value);
    this.totalAmount = this.sum(this.startDate.value, this.endDate.value);
    this.openSnackBar('Đặt phòng thành công!', 'Đóng');
  }

}
