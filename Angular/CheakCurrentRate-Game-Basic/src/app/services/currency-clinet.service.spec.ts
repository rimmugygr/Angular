import { TestBed } from '@angular/core/testing';

import { CurrencyClientService } from './currency-client.service';

describe('CurrencyClinetService', () => {
  let service: CurrencyClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
