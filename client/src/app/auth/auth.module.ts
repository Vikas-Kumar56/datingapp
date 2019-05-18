import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth.routing.module";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [RegisterComponent, LoginComponent],

  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule]
})
export class AuthModule {}
