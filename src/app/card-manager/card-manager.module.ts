import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  CardManagerComponent
} from './card-manager.component';
import {
  CardManagerRoutingModule
} from './card-manager-routing.module';
import {
  CardListComponent
} from './card-list/card-list.component';
import {
  ViewCardComponent
} from './view-card/view-card.component';
import {
  EditCardComponent
} from './edit-card/edit-card.component';
import {
  SharedModule
} from '../shared/shared.module';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import {
  AddCardComponent
} from './add-card/add-card.component';



@NgModule({
  declarations: [CardManagerComponent, CardListComponent, ViewCardComponent, EditCardComponent, AddCardComponent],
  imports: [
    CommonModule,
    CardManagerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CardManagerModule {}
