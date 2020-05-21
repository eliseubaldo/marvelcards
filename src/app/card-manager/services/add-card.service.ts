import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarvelCard } from 'src/app/models/marvelcard.interface';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AddCardService extends BaseHttpService{

  constructor(httpClient: HttpClient ) {
    super(httpClient);
  }


  public addCard(payload: MarvelCard): Observable<MarvelCard> {
    return super.post(payload);
  }

  public addImages(payload: any): Observable<any> {
    return super.postImages(payload);
  }
  
}
