import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../aut.service";
import { AlertifyService } from "src/app/shared/services/alertify/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        this.alertify.success("login successfully");
        this.router.navigate(["/home"]);
      },
      error => {
        this.alertify.error("Error in login");
      }
    );
  }

  cancel() {}
}
