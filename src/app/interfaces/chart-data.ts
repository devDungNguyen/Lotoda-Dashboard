export interface chartData {
  labels: string[];
  selectedLabels: string[];
  values: number[];
  selectedValues: number[];
  selectedItem?: any;
  datasets?: BarDataset[];
}

export interface BarDataset {
  data: number[];
  label: string | number;
  backgroundColor: string;
}
