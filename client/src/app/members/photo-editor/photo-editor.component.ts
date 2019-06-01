import { Component, OnInit, Input } from "@angular/core";
import { Photo } from "src/app/models/photo";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/auth/aut.service";
import { UserService } from "src/app/shared/services/user.service";
import { AlertifyService } from "src/app/shared/services/alertify/alertify.service";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"]
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.intiFileUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  setMainPhoto(photo: Photo) {
    let userId = this.authService.getUserId();
    this.userService.setMainPhoto(userId, photo.id).subscribe(
      () => {
        this.alertify.success("Main photo set Successfully");

        this.photos.forEach(ph => {
          if (ph.isMain && ph.id !== photo.id) {
            ph.isMain = false;
          }

          if (ph.id === photo.id) {
            ph.isMain = true;
          }
        });

        //emit main photo id for other component
        this.userService.setMainPhotoEmitter.next(photo);
      },
      error => {
        this.alertify.error("Error in setting main photo");
      }
    );
  }

  deletePhoto(photo: Photo) {
    let userId = this.authService.getUserId();
    this.userService.deletePhoto(userId, photo.id).subscribe(
      reponse => {
        this.photos.splice(this.photos.indexOf(photo), 1);
        this.alertify.success("Photo has been deleted");
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  intiFileUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "user/" + this.authService.getUserId() + "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, heasders) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
          publicId: res.publicId
        };
        this.photos.push(photo);
      }
    };
  }
}
