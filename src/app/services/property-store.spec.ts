import { TestBed } from '@angular/core/testing';

import { PropertyStore } from './property-store';

describe('PropertyStore', () => {
  let service: PropertyStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
