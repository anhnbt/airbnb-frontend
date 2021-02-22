import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ListHomeService} from '../../services/list-home.service';
import {FormControl} from '@angular/forms';
import {ListCityService} from '../../services/list-city.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  places: any;
  rooms: Observable<any>;
  myControl = new FormControl();
  back: any;
  roomImg = [];
  roomLength = 0;
  add = '';
  avgRatting = 0;
  ratting = '';
  key: string = 'name';
  reverse: boolean = false;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private serviceHome: ListHomeService,
              private serviceCity: ListCityService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.serviceHome.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.rooms = this.dataSource.connect();
      this.roomLength = res.data.length;

    });

    this.serviceCity.getAllCity().subscribe((res: any) => {
      this.places = res.data;
      console.log(this.places);
    });
  }

  search(id: number): void {
    this.serviceHome.findAllByCityId(id).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.rooms = this.dataSource.connect();
      this.roomLength = res.data.length;
    });
    this.back = 'Xem Tất Cả Phòng';
  }

  search2(): void {
    this.serviceHome.findAllByAddress(this.add).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.roomLength = res.data.length;
    });
    this.back = 'Xem Tất Cả Phòng';
  }

  getAllHome(): void {
    this.serviceHome.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.rooms = this.dataSource.connect();
      this.back = '';
      this.roomLength = res.data.length;
    });

  }

}
