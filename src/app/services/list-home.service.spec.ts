import { TestBed } from '@angular/core/testing';

import { ListHomeService } from './list-home.service';

describe('ListHomeService', () => {
  let service: ListHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
