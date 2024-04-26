import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RoleCheckGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getUserRole().pipe(
      map((e) => {
        if (e["DepartmentID"] === route.data["role"]) {
          return true;
        } else {
          alert("YOU'RE NOT A CHIEF !!!");
          this.router.navigate(["/auth/login"]);
          return false;
        }
      }),
      catchError((err) => {
        this.router.navigate(["/auth/login"]);
        return of(false);
      })
    );
  }
}
