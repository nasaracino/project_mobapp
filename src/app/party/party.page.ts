import { Component, OnInit } from '@angular/core';
import {PokedataService} from '../services/pokedata.service';
import { Pokemon } from '../types/pokemon';
import {ToastanddialogService} from '../services/toastanddialog.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
})
export class PartyPage implements OnInit {
  userPokemon: Pokemon[] = [];
  constructor(private pokemonDataService: PokedataService, private toastAndDialog: ToastanddialogService) { }

  ngOnInit() {
    this.userPokemon = this.pokemonDataService.getUserPokemon();
  }
  removePokemonFromParty(id: number) {
      const pokemon = this.userPokemon.find(p => p.id === id);
      this.toastAndDialog.showConfirm(`Are you sure you want to remove ${pokemon.name.toUpperCase()} from your party?`)
        .then(dialogResult => {
        if (dialogResult.value) {
          this.pokemonDataService.deletePokemon(id);
          this.userPokemon = this.pokemonDataService.getUserPokemon();
          this.toastAndDialog.showToast(`${pokemon.name.toUpperCase()} has been removed from your party.`);
        }
      });
  }
}
