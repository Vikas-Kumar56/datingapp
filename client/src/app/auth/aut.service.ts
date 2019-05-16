import { HttpClient } from "@angular/common/http";
import { Inject, Injector } from "@angular/core";
import { map } from "rxjs/operators";

@Inject({})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(payload: { username: string; password: string }) {
    return this.httpClient
      .post("http://localhost:5000/api/auth/login", payload)
      .pipe(
        map((response: any) => {
          if (response) {
            // save token to local storage
            localStorage.setItem("token", response.token);
          }
        })
      );
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logOut() {
    localStorage.removeItem("token");
  }
}
