import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map, forkJoin, BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon';

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonFrenchName(id: number): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${id}`).pipe(
      map(data => {
        const frenchName = data.names.find((name: any) => name.language.name === 'fr');
        return frenchName ? frenchName.name : data.name;
      })
    );
  }

  getPokemonList(offset: number = 0, limit: number = 151): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map(result => result.results),
      switchMap(pokemons => {
        const detailRequests = pokemons.map(pokemon =>
          this.http.get<Pokemon>(pokemon.url).pipe(
            switchMap(pokemonData => 
              this.getPokemonFrenchName(pokemonData.id).pipe(
                map(frenchName => ({
                  ...pokemonData,
                  frenchName: frenchName
                }))
              )
            )
          )
        );
        return forkJoin(detailRequests);
      })
    );
  }

  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`).pipe(
      switchMap(pokemon => 
        this.getPokemonFrenchName(pokemon.id).pipe(
          map(frenchName => ({
            ...pokemon,
            frenchName: frenchName
          }))
        )
      )
    );
  }

  searchPokemon(name: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseUrl}/pokemon?name=${name}`);
  }
}
