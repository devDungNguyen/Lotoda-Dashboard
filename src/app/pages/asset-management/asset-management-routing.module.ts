import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportInventoryComponent } from "./report-inventory/report-inventory.component";
import { AssetManagementComponent } from "./asset-management.component";
import { NodesComponent } from "./nodes/nodes.component";

const routes: Routes = [
  {
    path: "",
    component: AssetManagementComponent,
    children: [
      {
        path: "report-and-inventory",
        component: ReportInventoryComponent,
      },
      {
        path: "nodes",
        component: NodesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetManagementRoutingModule {}

export const routedComponents = [
  AssetManagementComponent,
  ReportInventoryComponent,
  NodesComponent,
];
