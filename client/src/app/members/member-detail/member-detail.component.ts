import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user.service";
import { AlertifyService } from "src/app/shared/services/alertify/alertify.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { User } from "src/app/models/user";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"]
})
export class MemberDetailComponent implements OnInit {
  id: number;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.userService.getUser(this.id).subscribe(
        user => {
          this.user = user;
          this.galleryImages = this.getImages();
        },
        error => {
          this.alertify.error("Error in loading user");
        }
      );
    });
  }

  getImages() {
    const imageUrls = [];
    for (let photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }
}
