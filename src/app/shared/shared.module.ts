import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdRatingEvents } from './components/rating-input/rating-input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ToastsComponent } from './components/toasts/toasts.component';



@NgModule({
  declarations: [HeaderComponent, NgbdRatingEvents, SpinnerComponent, ConfirmationModalComponent, ToastsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    NgbdRatingEvents,
    SpinnerComponent,
    ToastsComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ]
})
export class SharedModule { }
