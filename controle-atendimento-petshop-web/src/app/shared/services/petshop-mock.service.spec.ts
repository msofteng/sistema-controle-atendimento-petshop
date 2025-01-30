import { TestBed } from '@angular/core/testing';
import { PetshopMockService } from './petshop-mock.service';

describe('PetshopMockService', () => {
  let service: PetshopMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetshopMockService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});