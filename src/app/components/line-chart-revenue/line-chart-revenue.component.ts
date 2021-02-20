import {Component, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {BookingService} from '../../services/booking.service';
import {SalesMonthService} from '../../services/sales-month.service';

@Component({
  selector: 'app-line-chart-revenue',
  templateUrl: './line-chart-revenue.component.html',
  styleUrls: ['./line-chart-revenue.component.css']
})
export class LineChartRevenueComponent implements OnInit {

  chart: any;
  year = new Date().getFullYear();

  constructor(private salesMonthService: SalesMonthService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): any {
    const userLocal = JSON.parse(localStorage.getItem('airbnb_account'));
    this.salesMonthService.getSalesMonth(userLocal.id, this.year).subscribe(resF => {
      this.salesMonthService.getSalesMonth(userLocal.id, this.year - 1).subscribe(res => {
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
              {
                label: 'Doanh thu năm nay',
                data: resF.data,
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Doanh thu năm trước',
                data: res.data,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1,
                fill: false,
              }
            ]
          },
        });
      });
    });
  }
}
