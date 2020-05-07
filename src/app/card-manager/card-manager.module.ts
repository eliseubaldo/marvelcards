import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardManagerComponent } from './card-manager.component';
import { CardManagerRoutingModule } from './card-manager-routing.module';
import { CardListComponent } from './card-list/card-list.component';



@NgModule({
  declarations: [CardManagerComponent, CardListComponent],
  imports: [
    CommonModule,
    CardManagerRoutingModule
  ]
})
export class CardManagerModule { }
