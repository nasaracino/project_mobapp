import {Component, OnInit, ViewChild} from '@angular/core';
import {PokedataService} from '../services/pokedata.service';
import {IonInfiniteScroll} from '@ionic/angular';
import {Pokemon} from '../types/pokemon';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pokemonListRaw: any[] = [];
  pokemonList: Pokemon[] = [];
  currentPage;
  limit = 50;

  constructor(private pokemonDataService: PokedataService) {
    // this.retrievePage();
  }

  ngOnInit() {
    this.getPokemon();
    console.log(this.pokemonList);
  }
  getPokemon() {
    // if (this.pokemonList.length >= 50 && this.pokemonList.length <= 150) {
    //   this.limit += 50;
    // }
    this.pokemonDataService.getPokemon(this.limit)
      .subscribe((response: any) => {
        response.results.forEach(result => {
          this.pokemonDataService.getMorePokemonData(result.name)
            .subscribe((newResponse: any) => {
              this.pokemonListRaw.push(newResponse);
            });
        });
      });
  }
  async loadData(event): Promise<void> {
    await this.retrievePage();
    event.target.complete();
    if (this.pokemonList.length === 150) {
      event.target.disabled = true;
    }
  }
  private async retrievePage(): Promise<void> {
    const result = await this.getPokemon();
    this.currentPage++;
    this.pokemonListRaw.push(result);
  }

}
