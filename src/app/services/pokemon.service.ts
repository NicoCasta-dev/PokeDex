import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map, forkJoin, BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon';

// L'interface Pokemon (que vous avez déjà) : décrit la structure d'UN Pokémon avec tous ses détails
// L'interface PokemonListResponse : décrit la structure de la PREMIÈRE réponse de l'API quand on fait pokemon?offset=0&limit=151
// L'interface PokemonResult : décrit la structure de la RESPONSE de l'API quand on fait pokemon?offset=0&limit=151

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

  getPokemonList(offset: number = 0, limit: number = 151): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(map(result => result.results),

      switchMap(pokemons => {
        const detailRequests: Observable<Pokemon>[] = pokemons.map(pokemon =>
          this.http.get<Pokemon>(pokemon.url)
        );

        return forkJoin(detailRequests);
      })
    )
    ;
  }

  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`);
  }

  searchPokemon(name: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseUrl}/pokemon?name=${name}`);
  }
}
