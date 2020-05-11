import { TestBed } from '@angular/core/testing';

import { ViewCardService } from './view-card.service';

describe('ViewCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewCardService = TestBed.get(ViewCardService);
    expect(service).toBeTruthy();
  });
});
