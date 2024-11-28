import { TestBed } from '@angular/core/testing';

import { RecuperationService } from './recuperation.service';

describe('RecuperationService', () => {
  let service: RecuperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
