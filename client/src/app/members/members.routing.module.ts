import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MemberListComponent } from "./member-list/member-list.component";
import { AuthGuardService } from "../shared/guards/can.activate.guard";
import { MembersComponent } from "./members.component";
import { MemberDetailComponent } from "./member-detail/member-detail.component";
import { MemberEditComponent } from "./member-edit/member-edit.component";
import { CanDeactivateGuard } from "../shared/guards/can.deactivate.guard";

const appRoutes: Routes = [
  {
    path: "",
    component: MembersComponent,

    children: [
      {
        path: "",
        component: MemberListComponent
      },
      {
        path: "edit",
        component: MemberEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ":id",
        component: MemberDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class MembersRoutingModule {}
