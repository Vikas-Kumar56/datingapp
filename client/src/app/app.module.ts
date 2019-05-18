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
import { MemberListModule } from "./member-list/member-list.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, ValueComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    ListModule,
    MessagesModule,
    MemberListModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
