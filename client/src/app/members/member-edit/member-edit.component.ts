import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/aut.service";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/models/user";
import { AlertifyService } from "src/app/shared/services/alertify/alertify.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { CanComponentDeactivate } from "src/app/shared/guards/can.deactivate.guard";
import { Observable } from "rxjs";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit, CanComponentDeactivate {
  user: User;
  userForm: FormGroup;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    let id = this.authService.getUserId();
    this.userService.getUser(id).subscribe(
      user => {
        this.user = user;

        this.userForm.setValue(this.user);
      },
      error => {
        this.alertify.error("Error in retreiving user information");
      }
    );

    this.initUserForm();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      id: new FormControl(""),
      username: new FormControl(""),
      knownAs: new FormControl(""),
      age: new FormControl(""),
      gender: new FormControl(""),
      created: new FormControl(""),
      lastActive: new FormControl(""),
      photoUrl: new FormControl(""),
      city: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      interests: new FormControl("", [Validators.required]),
      introduction: new FormControl("", [Validators.required]),
      lookingFor: new FormControl("", [Validators.required]),
      photos: new FormArray([
        new FormGroup({
          id: new FormControl(""),
          url: new FormControl(""),
          description: new FormControl(""),
          dateAdded: new FormControl(""),
          isMain: new FormControl("")
        })
      ])
    });
  }

  onSaveUserForm() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.userService.updateUser(this.user.id, this.userForm.value).subscribe(
        response => {
          this.alertify.success("User have been updated");
          this.userForm.reset(this.userForm.value);
        },
        error => {
          this.alertify.error("Failed to update user");
        }
      );
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userForm.dirty) {
      return confirm("do you want to discard the changes ?");
    } else {
      return true;
    }
  }
}
