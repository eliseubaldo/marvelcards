import {
    NgModule
  } from '@angular/core';
  import {
    Routes,
    RouterModule
  } from '@angular/router';
import { CardGameComponent } from './card-game/card-game.component';
  
  const routes: Routes = [{
    path: '',
    component: CardGameComponent,
    children: [{
        path: '',
        pathMatch: 'full'
      }
    ]
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CardGameRoutingModule {}
  