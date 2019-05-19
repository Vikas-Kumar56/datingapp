import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { ValueComponent } from "./value/value.component";
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";
import { ListModule } from "./list/list.module";
import { MessagesModule } from "./messages/messages.module";
import { SharedModule } from "./shared/shared.module";
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [AppComponent, ValueComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    ListModule,
    MessagesModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
