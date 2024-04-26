import { TestBed } from '@angular/core/testing';

import { RoleCheckGuard } from './role-check.guard';

describe('RoleCheckGuard', () => {
  let guard: RoleCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
