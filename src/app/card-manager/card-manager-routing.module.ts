import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CardListComponent
} from './card-list/card-list.component';
import {
  CardManagerComponent
} from './card-manager.component';
import {
  ViewCardComponent
} from './view-card/view-card.component';
import {
  EditCardComponent
} from './edit-card/edit-card.component';



const routes: Routes = [{
  path: '',
  component: CardManagerComponent,
  children: [{
      path: '',
      pathMatch: 'full',
      redirectTo: 'card-list'
    },
    {
      path: 'card-list',
      pathMatch: 'full',
      component: CardListComponent,
    },
    {
      path: 'add-card',
      pathMatch: 'full',
      component: EditCardComponent,
    },
    {
      path: 'card/:id',
      component: ViewCardComponent,
    },
    {
      path: 'edit-card/:id',
      component: EditCardComponent,
    }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardManagerRoutingModule {}
