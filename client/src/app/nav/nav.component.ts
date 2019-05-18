import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth/aut.service";
import { AlertifyService } from "../services/alertify/alertify.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  logInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.logInForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  login() {
    this.authService.login(this.logInForm.value).subscribe(
      response => {
        this.alertify.success("Logged in Successfully");
      },
      error => {
        console.log(error);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  getUserName() {
    return this.authService.getUserName();
  }

  logOut() {
    this.authService.logOut();
    this.alertify.message("Logged out");
  }
}
