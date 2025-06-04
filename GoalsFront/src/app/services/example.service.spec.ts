import { TestBed } from '@angular/core/testing';

import { ExampleService } from './example.service';

describe('ExampleserviceService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
