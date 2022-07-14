import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartyPageRoutingModule } from './party-routing.module';

import { PartyPage } from './party.page';
import {NavbarComponent} from '../components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyPageRoutingModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [PartyPage, NavbarComponent]
})
export class PartyPageModule {}
