import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CardManagerComponent } from './card-manager.component';


const routes: Routes = [
  { 
    path: '',
    component: CardManagerComponent,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'card-list'
        },
        {
            path: 'card-list',
            pathMatch: 'full',
            component: CardListComponent,
        }

    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardManagerRoutingModule { }
