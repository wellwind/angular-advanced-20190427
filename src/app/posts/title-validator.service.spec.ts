import { TestBed } from '@angular/core/testing';

import { TitleValidatorService } from './title-validator.service';

describe('TitleValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleValidatorService = TestBed.get(TitleValidatorService);
    expect(service).toBeTruthy();
  });
});
