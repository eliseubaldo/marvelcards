import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdRatingEvents } from './components/rating-input/rating-input.component';



@NgModule({
  declarations: [HeaderComponent, NgbdRatingEvents],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    NgbdRatingEvents
  ]
})
export class SharedModule { }
