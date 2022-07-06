export interface PokemonApiResult<T> {
  results: T[];
  count: number;
  next?: number;
  previous?: number;
}
