import { TestBed } from '@angular/core/testing';

import { EditCardService } from './edit-card.service';

describe('EditCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditCardService = TestBed.get(EditCardService);
    expect(service).toBeTruthy();
  });
});
