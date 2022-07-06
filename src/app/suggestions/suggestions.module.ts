import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionsPageRoutingModule } from './suggestions-routing.module';

import { SuggestionsPage } from './suggestions.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SuggestionsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SuggestionsPage]
})
export class SuggestionsPageModule {}
