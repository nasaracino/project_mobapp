import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {PartyPage} from '../party/party.page';
import {SearchPage} from '../search/search.page';
import {SuggestionsPage} from '../suggestions/suggestions.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'party',
    component: PartyPage
  },
  {
    path: 'search',
    component: SearchPage
  },
  {
    path: 'suggestions',
    component: SuggestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
