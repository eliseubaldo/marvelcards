import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  HeaderComponent
} from './components/header/header.component';
import {
  RouterModule
} from '@angular/router';
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbdRatingEventsComponent
} from './components/rating-input/rating-input.component';
import {
  SpinnerComponent
} from './components/spinner/spinner.component';
import {
  ConfirmationModalComponent
} from './components/confirmation-modal/confirmation-modal.component';
import {
  ToastsComponent
} from './components/toasts/toasts.component';
import {
  CombineCardsModalComponent
} from './components/combine-cards-modal/combine-cards-modal.component';
import {
  FormsModule
} from '@angular/forms';
import {
  PaginationComponent
} from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NgbdRatingEventsComponent,
    SpinnerComponent,
    ConfirmationModalComponent,
    ToastsComponent,
    CombineCardsModalComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    NgbdRatingEventsComponent,
    SpinnerComponent,
    ToastsComponent,
    PaginationComponent

  ],
  entryComponents: [
    ConfirmationModalComponent,
    CombineCardsModalComponent
  ]
})
export class SharedModule {}
