import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/services/user.service";
import { User } from "../../models/user";
import { AlertifyService } from "../../shared/services/alertify/alertify.service";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        this.alertify.error("Error in loading users");
      }
    );
  }
}
