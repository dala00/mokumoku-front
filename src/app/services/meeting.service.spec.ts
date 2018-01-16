/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeetingService } from './meeting.service';
import { HttpService } from './http.service';

describe('MeetingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MeetingService,
        {
          provide: HttpService,
          useValue: {
            get: () => true,
          }
        }
      ]
    });
  });

  it('should ...', inject([MeetingService], (service: MeetingService) => {
    expect(service).toBeTruthy();
  }));
});
