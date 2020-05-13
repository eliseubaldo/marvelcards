import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  public title: string;
  public message: string;
  public confirmText: string;
  public cancelText: string;

  @Output()
  public confirmed: EventEmitter<boolean> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public confirm(): void {
    this.activeModal.dismiss();
    this.confirmed.emit(true);
  }

  public cancel(): void {
    this.activeModal.dismiss();
  }

}
