import { TestBed } from '@angular/core/testing';

import { ViewCardService } from './view-card.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ViewCardService = TestBed.get(ViewCardService);
    expect(service).toBeTruthy();
  });
});
