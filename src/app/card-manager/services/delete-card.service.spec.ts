import { TestBed } from '@angular/core/testing';

import { DeleteCardService } from './delete-card.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeleteCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: DeleteCardService = TestBed.get(DeleteCardService);
    expect(service).toBeTruthy();
  });
});
