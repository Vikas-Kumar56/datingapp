import { NgModule } from "@angular/core";
import { BsDropdownModule, TabsModule } from "ngx-bootstrap";
import { NgxGalleryModule } from "ngx-gallery";

@NgModule({
  imports: [BsDropdownModule.forRoot(), TabsModule.forRoot(), NgxGalleryModule],
  exports: [BsDropdownModule, TabsModule, NgxGalleryModule]
})
export class SharedModule {}
