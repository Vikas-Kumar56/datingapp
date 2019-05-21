import { NgModule } from "@angular/core";
import { MemberListComponent } from "./member-list/member-list.component";
import { CommonModule } from "@angular/common";
import { MemberCardComponent } from "./member-card/member-card.component";
import { MembersComponent } from "./members.component";
import { MembersRoutingModule } from "./members.routing.module";
import { MemberDetailComponent } from "./member-detail/member-detail.component";
import { SharedModule } from "../shared/shared.module";
import { MemberEditComponent } from "./member-edit/member-edit.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    MemberListComponent,
    MemberCardComponent,
    MembersComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MemberListModule {}
