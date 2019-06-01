import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { User } from "src/app/models/user";
import { Photo } from "src/app/models/photo";

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;
  setMainPhotoEmitter = new Subject<Photo>();
  deletedPhotoEmitter = new Subject<number>();
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + "user");
  }

  getUser(id: number) {
    return this.httpClient.get<User>(this.baseUrl + "user/" + id);
  }

  updateUser(id: number, user: User) {
    return this.httpClient.put(this.baseUrl + "user/" + id, user);
  }

  setMainPhoto(userId: number, photoId: number) {
    return this.httpClient.post(
      this.baseUrl + "user/" + userId + "/photos/" + photoId + "/setMain",
      {}
    );
  }

  deletePhoto(userId: number, photoId: number) {
    return this.httpClient.delete(
      this.baseUrl + "user/" + userId + "/photos/" + photoId
    );
  }
}
