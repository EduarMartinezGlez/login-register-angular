import { TestBed } from '@angular/core/testing';

import { ValidTokenGuard } from './valid-token.guard';

describe('ValidTokenGuard', () => {
  let guard: ValidTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
