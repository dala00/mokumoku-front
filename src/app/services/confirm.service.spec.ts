/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ConfirmService } from './confirm.service';

describe('ConfirmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfirmService,
        {
          provide: MdDialog,
          useValue: {},
        },
        {
          provide: MdDialogRef,
          useValue: {},
        }
      ]
    });
  });

  it('should ...', inject([ConfirmService], (service: ConfirmService) => {
    expect(service).toBeTruthy();
  }));
});
