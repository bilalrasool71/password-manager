import { TestBed } from '@angular/core/testing';

import { PasswordManagerService } from './password-manager.service';

describe('PasswordManagerService', () => {
  let service: PasswordManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
