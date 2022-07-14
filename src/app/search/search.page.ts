import {Component, OnInit, ViewChild} from '@angular/core';
import {PokedataService} from '../services/pokedata.service';
import {IonInfiniteScroll} from '@ionic/angular';
import {Pokemon} from '../types/pokemon';
import {ToastanddialogService} from '../services/toastanddialog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  limit = 30;
  offset = 0;
  searchText = '';
  pokemonList: Pokemon[] = [];

  constructor(private pokemonDataService: PokedataService, private toastAndDialog: ToastanddialogService) {
  }

  ngOnInit() {
    this.retrievePage();
  }
  addPokemonToParty(id: number) {
    if (this.pokemonDataService.getUserPokemon().length === 6) {
      this.toastAndDialog.showToast('You already have 6 Pokemon in your party. Please remove one before adding another.');
      return;
    }
    const pokemon = this.pokemonList.find(p => p.id === id);
    this.toastAndDialog.showConfirm(`Are you sure you want to add ${pokemon.name.toUpperCase()} to your party?`)
      .then(dialogResult => {
      if (dialogResult.value) {
        this.pokemonDataService.addPokemon(pokemon);
        this.toastAndDialog.showToast(`${pokemon.name.toUpperCase()} has been added to your party.`);
      }
    });
  };
  async searchChangeHandler(event: any): Promise<void> {
    this.searchText = event.detail.value;
    if (this.searchText === '') {
      this.infiniteScroll.disabled = false;
    }
    await this.retrievePage(true);
  }
  async loadData(event): Promise<void> {
    if (this.searchText === '') {
      console.log('enabled');
      event.target.disabled = false;
      await this.retrievePage();
      this.offset += 30;
      event.target.complete();
    }
    console.log(this.pokemonList);
    if (this.offset >= 150) {
      console.log('disabled');
      event.target.disabled = true;
    }
  }
  private async retrievePage(reset = false): Promise<Pokemon[]> {
    if (reset) {
      this.pokemonList = [];
      this.offset = 0;
      this.limit = 30;
    }
    if (this.searchText !== '') {
      this.pokemonList = [];
      console.log(this.pokemonList);
      return this.pokemonDataService.getPokemon(this.pokemonList, this.limit, this. offset, this.searchText.toLowerCase());
    }
    return this.pokemonDataService.getPokemon(this.pokemonList, this.limit, this.offset);
  }

}
