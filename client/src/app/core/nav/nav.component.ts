import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../auth/aut.service";
import { AlertifyService } from "../../shared/services/alertify/alertify.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  logInForm: FormGroup;
  userPhoto: any;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.logInForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });

    this.userService.setMainPhotoEmitter.subscribe(photo => {
      this.userPhoto = photo.url;
    });
  }

  login() {
    this.authService.login(this.logInForm.value).subscribe(
      response => {
        this.alertify.success("Logged in Successfully");
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  getUserName() {
    return this.authService.getUserName();
  }

  getUserPhoto() {
    const user: any = this.authService.getUser();
    return user.photoUrl;
  }

  logOut() {
    this.authService.logOut();
    this.alertify.message("Logged out");
    this.router.navigate(["/home"]);
  }
}
