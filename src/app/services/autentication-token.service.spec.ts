import { TestBed, inject } from '@angular/core/testing';

import { AutenticationTokenService } from './autentication-token.service';

describe('AutenticationTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticationTokenService]
    });
  });

  it('should be created', inject([AutenticationTokenService], (service: AutenticationTokenService) => {
    expect(service).toBeTruthy();
  }));
});
