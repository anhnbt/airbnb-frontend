import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ListHomeService} from '../../services/list-home.service';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {ProvinceService} from '../../services/province.service';

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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  places: any;
  rooms: Observable<any>;
  myControl = new FormControl();
  back: any;
  roomLength = 0;
  add = '';
  key = 'name';
  reverse = false;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private serviceHome: ListHomeService,
              private provinceService: ProvinceService,
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

    this.provinceService.findAll().subscribe((res: any) => {
      this.places = res.data;
    });
  }

  search(id: number): void {
    this.serviceHome.findAllByProvinceId(id).subscribe((res: any) => {
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
