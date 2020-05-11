import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { Observable } from 'rxjs';
import { MarvelCard } from 'src/app/models/marvelcard.interface';

@Injectable({
  providedIn: 'root'
})
export class ViewCardService extends BaseHttpService {

  constructor(httpClient: HttpClient ) {
    super(httpClient);
  }


  public getCard(id: string): Observable<MarvelCard> {
    return super.get(`/${id}`);
  }
}
