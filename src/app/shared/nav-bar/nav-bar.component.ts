import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  logo: string = 'assets/images/pokemon-23.svg';
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.updateSearch(this.searchTerm);
  }
}
