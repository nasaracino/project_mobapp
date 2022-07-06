import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {PokemonApiResult} from '../types/PokemonApiResult';
import {Pokemon} from '../types/pokemon';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedataService {
  baseURL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private httpClient: HttpClient) { }
  //Pokemon data ophalen
  getPokemon(limit: number) {
    return this.httpClient.get(`${this.baseURL}`,
      {
        observe: 'body',
        params: {
          limit,
        }
      }
    );
  }

  //Uitgebreid data van pokemon ophalen
  getMorePokemonData(name: string) {
    return this.httpClient.get(`${this.baseURL}/${name}`);
  }
}
