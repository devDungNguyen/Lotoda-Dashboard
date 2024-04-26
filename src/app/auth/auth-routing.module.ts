import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NbAuthComponent } from "@nebular/auth";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { IsLoggedInGuard } from "../guards/is-logged-in.guard";

export const routes: Routes = [
  {
    path: "",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "login",
        component: LoginComponent,
        canActivate: [IsLoggedInGuard],
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {}
