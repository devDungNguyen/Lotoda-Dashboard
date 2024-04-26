import { Component, OnInit } from "@angular/core";
import { NbAuthService, NbLoginComponent } from "@nebular/auth";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent extends NbLoginComponent {}
