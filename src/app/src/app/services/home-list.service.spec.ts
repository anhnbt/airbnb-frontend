import { TestBed } from '@angular/core/testing';

import { HomeListService } from './home-list.service';

describe('HomeListService', () => {
  let service: HomeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
