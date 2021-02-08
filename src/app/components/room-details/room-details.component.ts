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
    numberOfGuests: [1, Validators.required],
    numberOfChildren: [0, Validators.required],
    numberOfInfants: [0, Validators.required],
  });

  roomData: Room = {};
  
  numberOfDay: number = 0;
  amount: number = 0;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  myFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    const selectedDate = d || this.date.value;
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

  get guests(): number {
    return (this.numberOfGuests.value + this.numberOfChildren.value);
  }

  increment(input: AbstractControl): void {
    input.setValue(input.value + 1);
  }

  decrement(input: AbstractControl): void {
    input.setValue(input.value - 1);
  }

  onSubmit(): void {
    console.log(this.myForm.value);
    this.amount = this.calculate(this.startDate.value, this.endDate.value);
    this.openSnackBar('Đặt phòng thành công!', 'Đóng');
  }

  calculate(startDate: Date, endDate: Date): number {
    this.numberOfDay = endDate.getDate() - startDate.getDate();
    return this.numberOfDay * this.roomData.pricePerNight;
  }

}
