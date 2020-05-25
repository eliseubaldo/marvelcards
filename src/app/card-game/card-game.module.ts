import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGameComponent } from './card-game/card-game.component';
import { CardGameRoutingModule } from './card-game-routing.module';



@NgModule({
  declarations: [CardGameComponent],
  imports: [
    CommonModule,
    CardGameRoutingModule
  ]
})
export class CardGameModule { }
