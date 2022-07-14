import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Pokemon} from '../types/pokemon';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class PokedataService {
  baseURL = 'https://pokeapi.co/api/v2/pokemon';
  localStorage: Storage;
  private userPokemon: Pokemon[];
  private readonly storageKey = 'pokemon';
  constructor(private httpClient: HttpClient) { this.getPokemonStorage();}
  //Pokemon data ophalen
  getPokemonNames(limit: number, offset: number) {
    return this.httpClient.get(`${this.baseURL}`,
      {
        observe: 'body',
        params: {
          limit,
          offset
        }
      }
    );
  }
  //Uitgebreid data van pokemon ophalen
  getMorePokemonData(name: string) {
    return this.httpClient.get(`${this.baseURL}/${name}`);
  }
  //Beide methodes combineren om data dat wij nodig hebben op te halen
  getPokemon(pokemonList: Pokemon[], limit: number, offset: number, name: string = null) {
    if (name !== null) {
      limit = 150;
      offset = 0;
    }
    this.getPokemonNames(limit, offset)
      .subscribe((response: any) => {
        response.results.forEach(result => {
          this.getMorePokemonData(result.name)
            .subscribe((newResponse: any) => {
              const pokemon: Pokemon = {
                name: result.name,
                sprite: newResponse.sprites.front_default,
                type: newResponse.types[0].type.name,
                id: newResponse.id,
                statHP: newResponse.stats[0].base_stat,
                statAttack: newResponse.stats[1].base_stat,
                statDefense: newResponse.stats[2].base_stat,
                statSpAttack: newResponse.stats[3].base_stat,
                statSpDefense: newResponse.stats[4].base_stat,
                statSpeed: newResponse.stats[5].base_stat
              };
              if (pokemon.name.includes(name)) {
                // console.log('filtering');
                pokemonList.push(pokemon);
              } else if (name === null) {
                pokemonList.push(pokemon);
              }
            });
        });
      });
    return pokemonList;
  }
  async addPokemon(pokemon: Pokemon) {
    this.userPokemon.push(pokemon);
    await this.setPokemonStorage();
    console.log(this.userPokemon);
  }
  async deletePokemon(id: number) {
    this.userPokemon = this.userPokemon.filter(p => p.id !== id);
    await this.setPokemonStorage();
    console.log(this.userPokemon);
  }
  getUserPokemon(): Pokemon[] {
    this.getPokemonStorage().then((res) => {
      this.userPokemon = res;
    });
    console.log(this.userPokemon);
    return this.userPokemon;
  }
  private async getPokemonStorage(): Promise<Pokemon[]> {
    const pokemonList = await Storage.get({key: this.storageKey});
    this.userPokemon = JSON.parse(pokemonList.value) || [];
    return this.userPokemon;
  }
  private async setPokemonStorage(): Promise<void> {
    await Storage.set({
      key: this.storageKey,
      value: JSON.stringify(this.userPokemon)
    });
  }
}


