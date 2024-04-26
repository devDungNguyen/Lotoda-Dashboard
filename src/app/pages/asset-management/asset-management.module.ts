import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssetManagementComponent } from "./asset-management.component";
import { NbButtonModule, NbCardModule, NbSelectModule } from "@nebular/theme";
import { ChartsModule } from "../charts/charts.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ReportInventoryComponent } from "./report-inventory/report-inventory.component";
import { AssetManagementRoutingModule } from "./asset-management-routing.module";
import { NodesComponent } from './nodes/nodes.component';

@NgModule({
  declarations: [AssetManagementComponent, ReportInventoryComponent, NodesComponent],
  imports: [
    CommonModule,
    ChartsModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbButtonModule,
    AssetManagementRoutingModule,
  ],
})
export class AssetManagementModule {}
