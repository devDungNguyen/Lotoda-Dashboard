import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { NbAuthJWTToken, NbAuthService, NbTokenService } from "@nebular/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IsLoggedInGuard implements CanActivate {
  token: any;
  constructor(
    private authService: NbAuthService,
    private nbTokenService: NbTokenService
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue();
      }
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(this.token);
    this.nbTokenService.clear();

    if (this.token) {
      return false;
    }
    return true;
  }
}
