import { TestBed } from '@angular/core/testing';

import { NavGuardGuard } from './nav-guard.guard';

describe('NavGuardGuard', () => {
  let guard: NavGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NavGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
