import { TestBed } from '@angular/core/testing';

import { OrderbillingService } from './orderbilling.service';

describe('OrderbillingService', () => {
  let service: OrderbillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderbillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
