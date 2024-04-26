import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NbRegisterComponent } from "@nebular/auth";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends NbRegisterComponent {
  formData: {
    email: string;
    fullName: string;
    phoneNumber: string;
    password: string;
  };

  onRegister() {
    console.log(this.formData);
  }
}
