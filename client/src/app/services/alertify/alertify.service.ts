import { Injectable } from "@angular/core";
import * as alertify from "alertifyjs";

@Injectable()
export class AlertifyService {
  constructor() {}

  confirm(message: String, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }
}
