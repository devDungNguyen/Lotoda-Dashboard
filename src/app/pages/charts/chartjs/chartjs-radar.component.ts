import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import randomHex from "../../../utils/randomHex";

@Component({
  selector: "ngx-chartjs-radar",
  template: ` <chart type="radar" [data]="data" [options]="options"></chart> `,
})
export class ChartjsRadarComponent implements OnDestroy, OnInit {
  options: any;
  data: {};
  themeSubscription: any;

  @Input() labels: string[];
  @Input() values: number[];

  constructor(private theme: NbThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const chartjs: any = config.variables.chartjs;

      const _datasets = this.values.map((item, index) => {
        const color = randomHex();
        const value = {
          data: item,
          label: "Series " + index,
          borderColor: color,
          backgroundColor: NbColorHelper.hexToRgbA(color, 0.5),
        };
        return value;
      });

      this.data = {
        labels: this.labels,
        datasets: _datasets,
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scaleFontColor: "white",
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scale: {
          pointLabels: {
            fontSize: 14,
            fontColor: chartjs.textColor,
          },
          gridLines: {
            color: chartjs.axisLineColor,
          },
          angleLines: {
            color: chartjs.axisLineColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
