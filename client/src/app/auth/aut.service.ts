import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  JWTHelper = new JwtHelperService();
  decodeToken: any;
  constructor(private httpClient: HttpClient) {}

  login(payload: { username: string; password: string }) {
    return this.httpClient
      .post("http://localhost:5000/api/auth/login", payload)
      .pipe(
        map((response: any) => {
          if (response) {
            // save token to local storage
            localStorage.setItem("token", response.token);
            this.decodeToken = this.JWTHelper.decodeToken(response.token);
          }
        })
      );
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.JWTHelper.isTokenExpired(token);
  }

  getUserName() {
    this.decodeToken = this.JWTHelper.decodeToken(
      localStorage.getItem("token")
    );
    if (this.decodeToken) {
      return this.decodeToken.unique_name;
    }
    return "";
  }

  getUserId() {
    this.decodeToken = this.JWTHelper.decodeToken(
      localStorage.getItem("token")
    );
    if (this.decodeToken) {
      return this.decodeToken.nameid;
    }
    return "";
  }

  logOut() {
    localStorage.removeItem("token");
  }

  register(payload: { username: string; password: string }) {
    return this.httpClient.post(
      "http://localhost:5000/api/auth/register",
      payload
    );
  }
}
