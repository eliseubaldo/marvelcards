import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGameComponent } from './card-game/card-game.component';
import { CardGameRoutingModule } from './card-game-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CardGameComponent],
  imports: [
    CommonModule,
    CardGameRoutingModule,
    SharedModule
  ]
})
export class CardGameModule { }
