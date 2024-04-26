import { Component, Input, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import randomHex from "../../../utils/randomHex";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.plugins.register(ChartDataLabels);
import Color from "colorjs.io";
import { color } from "d3-color";

@Component({
  selector: "ngx-chartjs-pie",
  template: ` <chart type="pie" [data]="data" [options]="options"></chart> `,
})
export class ChartjsPieComponent implements OnDestroy, OnInit, OnChanges {
  data: any;
  options: any;
  themeSubscription: any;
  colors: string[];

  @Input() labels: string[];
  @Input() values: number[];

  constructor(private theme: NbThemeService) {
    this.colors = [];
  }

  ngOnInit(): void {
    this.createChart();
  }

  private createChart() {
    if (this.labels) {
      this.labels.map((label) => {
        this.colors.push(randomHex());
      });
    }
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const chartjs: any = config.variables.chartjs;
      const _colors = config.variables;
      this.data = {
        labels: this.labels || [
          "Download Sales",
          "In-Store Sales",
          "Mail Sales",
        ],
        datasets: [
          {
            data: this.values || [300, 500, 100],
            backgroundColor:
              this.colors.length > 0
                ? this.colors
                : [
                    _colors.primaryLight,
                    _colors.infoLight,
                    _colors.successLight,
                  ],
          },
        ],
      };
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: function (context) {
              return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
            },
            color: "#fff",
            // color: "#575151",
            // backgroundColor: "#fff",
            font: {
              size: 18,
            },
            padding: {
              // top: 5,
              // bottom: 0,
              left: 25,
              right: 25,
            },
            borderRadius: 10,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
            // usePointStyle: true,
            pointStyleWidth: 40,
          },
          position: "left",
        },
      };
    });
  }

  ngOnChanges(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
