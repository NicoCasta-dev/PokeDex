import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerms = new BehaviorSubject<string>('');
  currentSearch = this.searchTerms.asObservable(); // Observable pour écouter les changements de la recherche

  updateSearch(term: string) {
    this.searchTerms.next(term);
  }
}