import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../../models/response';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

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
  }

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService) {
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

}
