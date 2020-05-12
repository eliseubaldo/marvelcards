import { TestBed } from '@angular/core/testing';

import { DeleteCardService } from './delete-card.service';

describe('DeleteCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteCardService = TestBed.get(DeleteCardService);
    expect(service).toBeTruthy();
  });
});
