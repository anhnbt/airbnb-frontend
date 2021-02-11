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
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    numberOfGuests: [1, Validators.required],
    numberOfChildren: [0, Validators.required],
    numberOfInfants: [0, Validators.required],
  });

  roomData: Room = {};

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
      this.roomData = res.data;
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
    console.log(this.startDate.value + ' - Changed...' + this.endDate.value);
  }

  increment(input: AbstractControl): void {
    input.setValue(input.value + 1);
  }

  decrement(input: AbstractControl): void {
    input.setValue(input.value - 1);
  }

  onSubmit(): void {
    console.log(this.myForm.value);
    this.openSnackBar('Đặt phòng thành công!', 'Đóng');
  }

  calculate(): void {
    this.totalNights = this.endDate.value.getDate() - this.startDate.value.getDate();
    this.total = this.totalNights * this.roomData.pricePerNight;
  }

}
