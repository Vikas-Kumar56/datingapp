import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListComponent } from "./list/list.component";
import { AuthGuardService } from "./shared/guards/can.activate.guard";

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },

  {
    path: "messages",
    component: MessagesComponent,
    canActivate: [AuthGuardService]
  },
  { path: "lists", component: ListComponent, canActivate: [AuthGuardService] },
  {
    path: "members",
    loadChildren: "./members/member-list.module#MemberListModule"
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
