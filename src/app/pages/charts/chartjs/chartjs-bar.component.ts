import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import BarChartDataset from "../../../interfaces/bar-chart-dataset";
import randomHex from "../../../utils/randomHex";
import { BarDataset } from "../../../interfaces/chart-data";
import { tooltip } from "leaflet";

@Component({
  selector: "ngx-chartjs-bar",
  template: ` <chart type="bar" [data]="data" [options]="options"></chart> `,
})
export class ChartjsBarComponent implements OnDestroy, OnChanges, OnInit {
  data: any;
  options: any;
  themeSubscription: any;

  @Input() datasets: BarDataset[];
  @Input() labels: string[];

  constructor(private theme: NbThemeService) {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    this.createChart();
  }

  private createChart() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.labels || [
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
        ],
        datasets: this.datasets || [
          {
            data: [65, 59, 80, 81, 56, 55, 40],
            label: "Series A",
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
          },
          {
            data: [28, 48, 40, 19, 86, 27, 90],
            label: "Series B",
            backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          datalabels: {
            color: "#fff",
            // backgroundColor: "#575151",
            font: {
              size: 18,
            },
          },
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: true,
              },
            },
          ],
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
