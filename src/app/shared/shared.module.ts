import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdRatingEvents } from './components/rating-input/rating-input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [HeaderComponent, NgbdRatingEvents, SpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    NgbdRatingEvents,
    SpinnerComponent
  ]
})
export class SharedModule { }
