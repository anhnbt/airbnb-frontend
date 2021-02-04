import { TestBed } from '@angular/core/testing';

import { ListCityService } from './list-city.service';

describe('ListCityService', () => {
  let service: ListCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
