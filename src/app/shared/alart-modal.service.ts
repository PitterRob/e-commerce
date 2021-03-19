import { Injectable } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
@Injectable({
  providedIn: 'root'
})
export class AlartModalService {

  constructor(private modalService: BsModalService) { }


  showAlertSuccess(message: string) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = 'success';
    bsModalRef.content.message = message;
  }

  showAlertSuccessTimeOut(message: string, timeOut: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = 'success';
    bsModalRef.content.message = message;
    bsModalRef.content.timeout = timeOut;
  }
}
