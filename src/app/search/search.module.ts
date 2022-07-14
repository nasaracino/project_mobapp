import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import {PartyPageModule} from '../party/party.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchPageRoutingModule,
        PartyPageModule
    ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
