import { TestBed } from '@angular/core/testing';

import { FilteredTransactions } from './filtered-transactions';

describe('FilteredTransactions', () => {
  let service: FilteredTransactions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilteredTransactions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
