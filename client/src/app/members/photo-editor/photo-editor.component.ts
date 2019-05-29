import { Component, OnInit, Input } from "@angular/core";
import { Photo } from "src/app/models/photo";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/auth/aut.service";

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
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.intiFileUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
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
