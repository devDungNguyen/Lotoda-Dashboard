import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../utils/definitions";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NbAuthJWTToken, NbAuthService, NbTokenService } from "@nebular/auth";

// const httpOptions = {
//   headers: new HttpHeaders({ "Content-Type": "Application/json" }),
// };

@Injectable({
  providedIn: "root",
})
export class AuthService {
  path: string = "employee-auth";
  httpHeaders: HttpHeaders;
  url: string = `${BASE_URL}/${this.path}`;
  role: number;

  constructor(
    private http: HttpClient,
    private authService: NbAuthService,
    private nbTokenService: NbTokenService
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${token.getValue()}`,
        });
      }
    });
  }

  getUser() {
    return this.http.post(this.url + "/me", null, {
      headers: this.httpHeaders,
    });
  }

  getUserRole() {
    return this.getUser();
  }

  logOut() {
    this.nbTokenService.clear();
    this.http.post(this.url + "/logout", null, {
      headers: this.httpHeaders,
    });
    window.location.reload();
  }
}
