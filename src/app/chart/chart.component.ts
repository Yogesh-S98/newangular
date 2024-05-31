import { Component, Input, OnInit } from '@angular/core';

interface inter {
  name: string,
  code: string
}
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  data: any;

  options: any;
  labels!: any;
  contact!: inter[];
  selectedLabel = [
    { label: 'A', points: 300 }
  ];
  index = 0;
  // cities!: City[];

  // selectedCities!: City[];
  constructor() {
    this.labels = [
      { label: 'A', points: 300 },
      { label: 'B', points: 50 },
      { label: 'C', points: 100 }
    ];
    this.contact = [
      { name: 'rajesh', code: '123' },
      { name: 'hemanth', code: '134' }
    ]
  }
  clearValues() {
    this.selectedLabel =[];
    this.updateChart();
  }
  updateValue() {
    console.log('asddd', this.selectedLabel);
    this.updateChart();
  }
  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const labels = this.selectedLabel.map((x: any) => x.label);
      const points = this.selectedLabel.map((x: any) => x.points);
      this.data = {
          labels: labels,
          datasets: [
              {
                  data: points,
                  backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
          ]
      };


      this.options = {
          cutout: '90%',
          plugins: {
              // legend: {
              //     labels: {
              //         color: textColor
              //     }
              // }
          }
      };
  }
  ngOnInit() {
      this.updateChart();
  }
}
