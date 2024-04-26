import { Component, OnInit } from "@angular/core";
import { AssetService } from "../../../services/asset.service";
import Asset from "../../../models/asset";
import { LocalDataSource } from "ng2-smart-table";
import SmartTableSettings, {
  Column,
} from "../../../interfaces/smart-table-settings";
import { BarDataset, chartData } from "../../../interfaces/chart-data";
import { NbColorHelper } from "@nebular/theme";
import randomHex from "../../../utils/randomHex";
@Component({
  selector: "ngx-report-inventory",
  templateUrl: "./report-inventory.component.html",
  styleUrls: ["./report-inventory.component.scss"],
})
export class ReportInventoryComponent implements OnInit {
  isLoaded: boolean;
  assets: Asset[];
  limit: number;
  source: LocalDataSource;
  time: string;

  assetsEachRoom: chartData = {
    labels: [],
    values: [],
    selectedLabels: [],
    selectedValues: [],
  };

  assetsEachRoomMap = new Map<string, number>();

  differenceAssetsEachRoom: chartData = {
    labels: [],
    values: [],
    selectedLabels: [],
    selectedValues: [],
  };

  differenceAssetsEachRoomMap = new Map<
    any,
    {
      init?: number;
      moved?: number;
      current?: number;
    }
  >();

  assetsAllRooms: chartData = {
    labels: [],
    values: [],
    selectedLabels: [],
    selectedValues: [],
    selectedItem: 1,
  };

  assetsAllRoomsMap = new Map<
    string,
    {
      init?: number;
      current?: number;
      lost?: number;
      moved?: number;
    }
  >();

  settings: SmartTableSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {},
  };

  constructor(private assetService: AssetService) {
    this.isLoaded = false;
    this.assets = [];
    this.limit = 4;
    this.source = new LocalDataSource();
    this.time = "2024-03-20T12:00:00.0000";
  }

  ngOnInit(): void {
    this.init();
  }

  onAssetsEachRoomSelect(e: any[]) {
    const _values: number[] = [];
    this.assetsEachRoom.selectedLabels = e;

    this.assetsEachRoom.selectedLabels.map((label) => {
      _values.push(this.assetsEachRoomMap.get(label));
    });

    this.assetsEachRoom.selectedValues = _values;
  }

  onDifferenceAssetsEachRoomSelect(e: any[]) {
    const _values: any[] = [];
    this.differenceAssetsEachRoom.selectedLabels = e;
    this.differenceAssetsEachRoom.selectedLabels.map((label) => {
      _values.push(this.differenceAssetsEachRoomMap.get(label));
    });

    this.differenceAssetsEachRoom.selectedValues = _values;

    this.createDifferenceAssetsEachRoomDatasets();
  }

  onAssetsAllRoomsSelect(e: any) {
    this.assetsAllRooms.selectedItem = e;
    const _values = this.assetsAllRoomsMap.get(e);
    this.assetsAllRooms.selectedValues = [
      _values["init"],
      _values["current"],
      _values["moved"],
      _values["lost"],
    ];
  }

  private init() {
    this.assets = this.assetService.getAsset();
    this.createAssetTable();

    this.createAssetsEachRoomData();
    this.createDifferenceAssetsEachRoomData();
    this.createAssetsAllRooms();
    this.isLoaded = true;
  }

  private createAssetTable() {
    this.source.load(this.assets);

    const keys = Object.keys(this.assets[0]);
    const columns: Column[] = [];

    keys.map((key: any | string) => {
      columns.push({
        [key]: {
          title: key.match(/[A-Z][a-z]+/g).join(" "),
          type: typeof key,
        },
      });
    });

    Object.assign(this.settings.columns, ...columns);
  }

  private createAssetsEachRoomData() {
    this.assets.map((asset: Asset) => {
      const location = asset["Location"]; // RoomC

      if (!this.assetsEachRoomMap.has(location)) {
        this.assetsEachRoomMap.set(location, 1);
      } else {
        const currentCount = this.assetsEachRoomMap.get(location);
        this.assetsEachRoomMap.set(location, currentCount + 1);
      }
    });

    this.assetsEachRoomMap.forEach((value: any, key: string) => {
      this.assetsEachRoom.labels.push(key);
      this.assetsEachRoom.values.push(value);
    });

    this.assetsEachRoom.selectedLabels = this.assetsEachRoom.labels.filter(
      (label: any, index: number) => {
        return index < this.limit ? label : null;
      }
    );

    this.assetsEachRoom.selectedValues = this.assetsEachRoom.values.filter(
      (value: any, index: number) => {
        return index < this.limit ? value : null;
      }
    );
  }

  private createDifferenceAssetsEachRoomData() {
    this.assets.map((asset: Asset) => {
      const initLocation = asset.Location; // RoomC

      if (!this.differenceAssetsEachRoomMap.has(initLocation)) {
        this.differenceAssetsEachRoomMap.set(initLocation, {
          init: 1,
          moved: 0,
          current: 1,
        });
      } else {
        const currentCount =
          this.differenceAssetsEachRoomMap.get(initLocation).init;
        this.differenceAssetsEachRoomMap.set(initLocation, {
          init: currentCount + 1,
          moved: 0,
          current: currentCount + 1,
        });
      }
    });

    this.assets.map((asset: Asset) => {
      const initLocation = asset.Location; // RoomC
      const currentLocation = asset.CurrentLocation; // RoomA

      if (currentLocation !== initLocation) {
        const currentValue =
          this.differenceAssetsEachRoomMap.get(initLocation).moved;
        const initValue =
          this.differenceAssetsEachRoomMap.get(initLocation).init;
        this.differenceAssetsEachRoomMap.set(initLocation, {
          init: initValue,
          moved: currentValue + 1,
          current: initValue - (currentValue + 1),
        });
      }
    });

    this.differenceAssetsEachRoomMap.forEach((value: any, key: string) => {
      this.differenceAssetsEachRoom.labels.push(key);
      this.differenceAssetsEachRoom.values.push(value);
    });

    this.differenceAssetsEachRoom.selectedLabels =
      this.differenceAssetsEachRoom.labels.filter(
        (label: any, index: number) => {
          return index < this.limit ? label : null;
        }
      );

    this.differenceAssetsEachRoom.selectedValues =
      this.differenceAssetsEachRoom.values.filter(
        (value: any, index: number) => {
          return index < this.limit ? value : null;
        }
      );

    this.createDifferenceAssetsEachRoomDatasets();
  }

  private createDifferenceAssetsEachRoomDatasets() {
    const datasets: BarDataset[] = [];
    const initList: number[] = [];
    const currentList: number[] = [];
    const movedList: number[] = [];

    this.differenceAssetsEachRoom.selectedValues.map((value, index) => {
      initList.push(value["init"]);
      currentList.push(value["current"]);
      movedList.push(value["init"] - value["current"]);
    });

    datasets.push({
      label: "Ban đầu",
      backgroundColor: NbColorHelper.hexToRgbA(randomHex(), 1),
      data: initList,
    });

    datasets.push({
      label: "Di dời",
      backgroundColor: NbColorHelper.hexToRgbA(randomHex(), 1),
      data: movedList,
    });

    datasets.push({
      label: "Hiện tại",
      backgroundColor: NbColorHelper.hexToRgbA(randomHex(), 1),
      data: currentList,
    });

    this.differenceAssetsEachRoom.datasets = datasets;
  }

  private createAssetsAllRooms() {
    this.assets.map((asset: Asset) => {
      const initLocation = asset.Location; // RoomC
      const currentLocation = asset.CurrentLocation; // RoomA
      const currentTime = asset.UpdatedTimeAt;
      const map = this.assetsAllRoomsMap.get(initLocation);
      const data = {
        init: map !== undefined ? map.init : 0,
        current: map !== undefined ? map.current : 0,
        moved: map !== undefined ? map.moved : 0,
        lost: map !== undefined ? map.lost : 0,
      };

      if (!this.assetsAllRoomsMap.has(initLocation)) {
        data.init = 1;
        data.current = 1;
        this.assetsAllRoomsMap.set(initLocation, data);
      } else {
        data.init++;
        data.current++;

        this.assetsAllRoomsMap.set(initLocation, data);
      }

      if (initLocation !== currentLocation) {
        data.moved++;
        data.current = data.init - data.moved;

        this.assetsAllRoomsMap.set(initLocation, data);
      }

      if (currentTime < this.time) {
        data.lost++;
        data.current =
          data.current - data.lost < 0 ? 0 : data.current - data.lost;

        this.assetsAllRoomsMap.set(initLocation, data);
      }
    });

    this.assetsAllRoomsMap.forEach((value: any, key: string) => {
      this.assetsAllRooms.labels.push(key);
      this.assetsAllRooms.values.push(value);
    });

    this.assetsAllRooms.selectedLabels = [
      "Ban đầu",
      "Hiện tại",
      "Di dời",
      "Mất",
    ];

    const v = this.assetsAllRooms.values[0];
    this.assetsAllRooms.selectedValues = [
      v["init"],
      v["current"],
      v["moved"],
      v["lost"],
    ];

    this.assetsAllRooms.selectedItem = this.assetsAllRooms.labels[0];
  }

  exportTableData() {
    this.downloadFile(this.assets);
  }

  downloadFile(data: any) {
    const replacer = (key: any, value: any) => (value === null ? "" : value);
    let header = Object.keys(data[0]).map((h: string) =>
      h.match(/[A-Z][a-z]+/g).join(" ")
    );
    const csv = data.map((row) =>
      header
        .map((fieldName: string) =>
          JSON.stringify(row[fieldName.split(" ").join("")], replacer)
        )
        .join(",")
    );
    csv.unshift(header.join(","));
    const csvArray = csv.join("\r\n");

    const a = document.createElement("a");
    const blob = new Blob([csvArray], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "myFile.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
