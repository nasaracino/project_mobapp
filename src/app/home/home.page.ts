import {Component, OnInit} from '@angular/core';
import {PokedataService} from '../services/pokedata.service';
import { Pokemon } from '../types/pokemon';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userPokemon: Pokemon[] = [];
  constructor(private pokemonDataService: PokedataService) {
  }
  ngOnInit() {
    this.userPokemon = this.pokemonDataService.getUserPokemon();
  }
}
