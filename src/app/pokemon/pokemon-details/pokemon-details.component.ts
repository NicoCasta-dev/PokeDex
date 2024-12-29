import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {
  pokemonList: Pokemon[] = [];
  pokemon: Pokemon | undefined;


  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.pokemonService.getPokemonDetails(id).subscribe({
        next: (data) => {
          this.pokemon = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du pokémon:', err);
          this.router.navigate(['/pokemon-list']);
        }
      });
    });
  }

  getSvgUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  }
}
