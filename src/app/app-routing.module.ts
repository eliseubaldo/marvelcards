import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'card-manager',
    loadChildren: () => import('./card-manager/card-manager.module')
      .then(m => m.CardManagerModule)
  },
  {
    path: 'card-game',
    loadChildren: () => import('./card-game/card-game.module')
      .then(m => m.CardGameModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
