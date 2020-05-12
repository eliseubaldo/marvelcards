import { Injectable } from '@angular/core';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { HttpClient } from '@angular/common/http';
import { MarvelCard } from 'src/app/models/marvelcard.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteCardService extends BaseHttpService {

  constructor(httpClient: HttpClient ) {
    super(httpClient);
  }


  public deleteCard(id: string): Observable<MarvelCard> {
    return super.delete(`/${id}`);
  }
}
