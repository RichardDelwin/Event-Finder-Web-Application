import { TestBed } from '@angular/core/testing';

import { ComponentUpdateService } from './component-update.service';

describe('ComponentUpdateService', () => {
  let service: ComponentUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
