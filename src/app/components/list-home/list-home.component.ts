import { Component, OnInit } from '@angular/core';
import {ListHomeService} from '../../services/list-home.service';
import {FormControl} from '@angular/forms';
import {ListCityService} from '../../services/list-city.service';

interface Country {
id: number;
name: string;
city: any;

}
interface City {
  id: number;
  name: string;
}
@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html',
  styleUrls: ['./list-home.component.css']
})
export class ListHomeComponent implements OnInit {

  places: any;
   rooms: any;
  myControl = new FormControl();
  back: any;
  constructor(private serviceHome: ListHomeService, private serviceCity: ListCityService) { }

  ngOnInit(): void {
    this.serviceHome.getAll().subscribe((res: any) => {this.rooms = res.data;console.log(this.rooms); });
    this.serviceCity.getAllCity().subscribe((res: any) => {this.places = res.data;console.log(this.places); });
  }

  search(id: number) {
    this.serviceHome.findAllByCityId(id).subscribe((res: any) => {this.rooms = res.data;console.log(id +' search'); })
    this.back = 'Xem Tất Cả Phòng'
  }

  getAllHome() {
    this.serviceHome.getAll().subscribe((res: any) => {this.rooms = res.data;console.log(this.rooms); });

  }
}
