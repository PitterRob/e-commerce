import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit, AfterViewChecked {
  @Input() message: string = '';
  @Input() type: 'success'
  @Input() timeout: number = 0;
  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {

  }

  ngAfterViewChecked(): void {
    if (this.timeout > 0) {
      setTimeout(() => {
        this.onClose();
      }, this.timeout);
    }
  }
  onClose() {
    this.bsModalRef.hide();
  }
}
