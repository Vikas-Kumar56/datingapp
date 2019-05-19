import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + "user");
  }

  getUser(id: number) {
    return this.httpClient.get<User>(this.baseUrl + "user/" + id);
  }
}
