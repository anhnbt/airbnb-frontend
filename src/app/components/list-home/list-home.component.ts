import { Component, OnInit } from '@angular/core';
import {HomeListService} from '../../src/app/services/home-list.service';


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
  rooms: any;
  country: Country[] = [
  {id: 1, name: 'viet nam', city: [{id: 1, name: 'ha noi'}, {id: 2, name: 'sai gon'}]},
  {id: 2, name: 'china ', city: [{id: 3, name: 'bac kinh'}, {id: 4, name: 'thuong hai'}]}
];
  constructor(private service: HomeListService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((res: any) => {this.rooms = res.data;console.log(this.rooms); });

  }

}
