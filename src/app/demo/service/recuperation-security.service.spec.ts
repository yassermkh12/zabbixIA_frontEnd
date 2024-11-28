import { TestBed } from '@angular/core/testing';

import { RecuperationSecurityService } from './recuperation-security.service';

describe('RecuperationSecurityService', () => {
  let service: RecuperationSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperationSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
