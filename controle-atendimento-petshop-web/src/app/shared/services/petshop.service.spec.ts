import { TestBed } from '@angular/core/testing';

import { PetshopService } from './petshop.service';

describe('PetshopService', () => {
  let service: PetshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
