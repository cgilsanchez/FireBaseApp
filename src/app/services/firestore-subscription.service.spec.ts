import { TestBed } from '@angular/core/testing';

import { FirestoreSubscriptionService } from './firestore-subscription.service';

describe('FirestoreSubscriptionService', () => {
  let service: FirestoreSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
