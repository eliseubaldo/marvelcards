import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { Observable } from 'rxjs';
import { MarvelCard } from 'src/app/models/marvelcard.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsListService extends BaseHttpService {

  constructor(httpClient: HttpClient ) {
    super(httpClient);
  }


  public getCardList(): Observable<MarvelCard[]> {
    return super.get('');
  }

  public getPaginatedCardList(cardsPerPage, currentPage): Observable<any> {
    return super.get(`?totals=true&skip=${currentPage}&max=${cardsPerPage}`);
  }

  public getCardTotal(): Observable<any> {
    return super.get('?totals=true&count=true');
  }

  
}
