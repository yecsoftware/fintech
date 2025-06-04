import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { logoutcheckGuard } from './logoutcheck.guard';

describe('logoutcheckGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logoutcheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
