import { TestBed } from '@angular/core/testing';

import { WasteWizardAPIService } from './waste-wizard-api.service';

describe('WasteWizardAPIService', () => {
  let service: WasteWizardAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasteWizardAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
