import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { NavComponent } from "./nav/nav.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../auth/aut.service";
import { ErrorInterceptorProvider } from "../shared/services/error.interceptor";
import { AlertifyService } from "../shared/services/alertify/alertify.service";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app.routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthGuardService } from "../shared/guards/can.activate.guard";
import { UserService } from "../shared/services/user.service";
import { CanDeactivateGuard } from "../shared/guards/can.deactivate.guard";

@NgModule({
  declarations: [HomeComponent, NavComponent],
  imports: [ReactiveFormsModule, CommonModule, AppRoutingModule, SharedModule],
  exports: [NavComponent, AppRoutingModule],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuardService,
    UserService,
    CanDeactivateGuard
  ]
})
export class CoreModule {}
