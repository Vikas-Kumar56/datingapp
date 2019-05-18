import { CanActivate } from "@angular/router/src/utils/preactivation";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/auth/aut.service";
import { AlertifyService } from "../services/alertify/alertify.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      if (next.url[0].path === "login" || next.url[0].path === "register") {
        this.router.navigate(["/home"]);
        return false;
      }
      return true;
    } else if (
      next.url[0].path === "login" ||
      next.url[0].path === "register"
    ) {
      return true;
    }
    this.alertify.error("Please login to navigate this route");
    this.router.navigate(["/login"]);
    return false;
  }
}
