import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "../shared/guards/can.activate.guard";

const appRoutes: Routes = [
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthGuardService]
  },
  { path: "login", component: LoginComponent, canActivate: [AuthGuardService] }
];
@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
