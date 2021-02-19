import {Component, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-line-chart-revenue',
  templateUrl: './line-chart-revenue.component.html',
  styleUrls: ['./line-chart-revenue.component.css']
})
export class LineChartRevenueComponent implements OnInit {

  chart: any;

  constructor() {
  }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Doanh thu',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            fill: false,
          }
        ]
      },
    });
  }

}
