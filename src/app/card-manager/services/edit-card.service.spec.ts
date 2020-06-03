import { TestBed } from '@angular/core/testing';

import { EditCardService } from './edit-card.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: EditCardService = TestBed.get(EditCardService);
    expect(service).toBeTruthy();
  });
});
