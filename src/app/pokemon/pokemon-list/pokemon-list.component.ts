import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  pokemons: Pokemon[] = [];
  loading = true;
  error = false;
  currentPage = 1;
  pokemonParPage = 9;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList(0, 151).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des pokémons:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  getPage() {
    const start = (this.currentPage - 1) * this.pokemonParPage;
    return this.pokemons.slice(start, start + this.pokemonParPage);
  }
}
