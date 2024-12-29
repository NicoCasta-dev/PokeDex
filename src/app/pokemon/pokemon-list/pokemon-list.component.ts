import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  loading = true;
  error = false;
  currentPage = 1;
  pokemonParPage = 20;
  Math = Math;

  constructor(
    private pokemonService: PokemonService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList(0, 151).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.filteredPokemons = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des pokémons:', err);
        this.error = true;
        this.loading = false;
      }
    });
    this.searchService.currentSearch.subscribe(term => {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
      this.currentPage = 1;
    });
  }

  getPage() {
    const start = (this.currentPage - 1) * this.pokemonParPage;
    return this.filteredPokemons.slice(start, start + this.pokemonParPage);
  }

  getSvgUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  }
}
