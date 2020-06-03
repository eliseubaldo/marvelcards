import { TestBed } from '@angular/core/testing';

import { CardsListService } from './cards-list.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CardsListService = TestBed.get(CardsListService);
    expect(service).toBeTruthy();
  });
});
