import { TestBed } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController } from '@angular/common/http/testing';
import { BaseHttpService } from './base-http.service';

describe('BaseHttpService', () => {
    let baseHttpService: BaseHttpService;
    let httpTestingCtrl: HttpTestingController;
    let mockData: any;

  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    providers: [BaseHttpService]
  }));

  describe('methods', () => {

    beforeEach(() => {
        baseHttpService = TestBed.get(BaseHttpService);
        httpTestingCtrl = TestBed.get(HttpTestingController);
        mockData = [
            {
                name: 'string',
                attack: 12,
                defense: 12,
                combines: ['x-men', 'avengers'],
                cardtype: 'single',
                alignment: 'hero',
                affiliation: 'spider-man',
                imagefront: 'image.jpg',
                imageback: 'imageback.jpg',
                _id: '54ggbca'
            }
        ]
    });

    it('should GET heroes' ,() => {
        baseHttpService.get('').subscribe((heroes) => {
            expect(heroes[0]).toEqual(mockData);
        });
        const request = httpTestingCtrl.expectOne('https://marvelheroes-1d22.restdb.io/rest/marvelcards');
        request.flush([mockData]);
        httpTestingCtrl.verify();
    });
  });



  it('should be created', () => {
    const service: BaseHttpService = TestBed.get(BaseHttpService);
    expect(service).toBeTruthy();
  });

 
});
