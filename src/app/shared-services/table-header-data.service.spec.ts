import { TestBed } from '@angular/core/testing';

import { TableHeaderDataService } from './table-header-data.service';

describe('TableHeaderDataService', () => {
  let service: TableHeaderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableHeaderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
