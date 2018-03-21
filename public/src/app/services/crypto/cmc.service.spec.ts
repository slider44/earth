import { TestBed, inject } from '@angular/core/testing';

import { CmcService } from './cmc.service';

describe('CmcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmcService]
    });
  });

  it('should be created', inject([CmcService], (service: CmcService) => {
    expect(service).toBeTruthy();
  }));
});
