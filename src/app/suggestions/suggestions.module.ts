import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionsPageRoutingModule } from './suggestions-routing.module';

import { SuggestionsPage } from './suggestions.page';
import {PartyPageModule} from '../party/party.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SuggestionsPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PartyPageModule
    ],
  declarations: [SuggestionsPage]
})
export class SuggestionsPageModule {}
