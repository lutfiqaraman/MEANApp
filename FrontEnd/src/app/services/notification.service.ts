import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: ToastrService) { }

  // Success notification
  onSuccess(msg: string) {
    this.toast.success(msg, 'success', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    });
  }

  // Error notification
  onFail(msg: string) {
    this.toast.error(msg, 'error', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    });
  }

  // Warn notification
  onWarn(msg: string) {
    this.toast.warning(msg, 'worn', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    });
  }
}
