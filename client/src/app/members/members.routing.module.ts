import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MemberListComponent } from "./member-list/member-list.component";
import { AuthGuardService } from "../shared/guards/can.activate.guard";
import { MembersComponent } from "./members.component";
import { MemberDetailComponent } from "./member-detail/member-detail.component";

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
        path: ":id",
        component: MemberDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class MembersRoutingModule {}
