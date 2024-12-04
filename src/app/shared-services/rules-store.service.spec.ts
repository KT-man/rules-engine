import { TestBed } from '@angular/core/testing';
import { RulesStoreService } from './rules-store.service';

describe('RulesStoreService', () => {
  let service: RulesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
