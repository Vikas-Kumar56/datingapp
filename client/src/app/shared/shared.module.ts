import { NgModule } from "@angular/core";
import { BsDropdownModule, TabsModule } from "ngx-bootstrap";
import { NgxGalleryModule } from "ngx-gallery";
import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule
  ],
  exports: [BsDropdownModule, TabsModule, NgxGalleryModule, FileUploadModule]
})
export class SharedModule {}
