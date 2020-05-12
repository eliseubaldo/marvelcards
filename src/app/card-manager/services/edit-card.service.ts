import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarvelCard } from 'src/app/models/marvelcard.interface';

@Injectable({
  providedIn: 'root'
})
export class EditCardService extends BaseHttpService {

  
  constructor(httpClient: HttpClient ) {
    super(httpClient);
  }


  public updateCard(id: string, payload: MarvelCard): Observable<MarvelCard> {
    return super.put(`/${id}`, payload);
  }
}
