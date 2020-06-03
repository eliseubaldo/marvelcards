import { TestBed } from '@angular/core/testing';

import { AddCardService } from './add-card.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AddCardService = TestBed.get(AddCardService);
    expect(service).toBeTruthy();
  });
});
