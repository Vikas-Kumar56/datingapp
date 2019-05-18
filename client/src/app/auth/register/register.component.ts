import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../aut.service";
import { AlertifyService } from "../../shared/services/alertify/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() hideRegister: EventEmitter<null> = new EventEmitter();
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(
      response => {
        this.alertify.success("register successfully");
        this.router.navigate(["/login"]);
      },
      error => {
        this.alertify.error("Error in registration");
        error.forEach((value, key) => {
          let formControl = this.registerForm.get(key);

          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: value
            });
          }
        });
      }
    );
  }

  cancel() {
    this.hideRegister.emit(null);
  }
}
