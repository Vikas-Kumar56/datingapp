import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth/aut.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() hideRegister: EventEmitter<null> = new EventEmitter();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(
      response => {
        console.log("register successfully");
      },
      error => {
        error.forEach((value, key) => {
          let formControl = this.registerForm.get(key);
          console.log(formControl);
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
