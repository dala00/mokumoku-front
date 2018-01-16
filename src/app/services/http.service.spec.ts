/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { HttpService } from './http.service';
import { DataService } from './data.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        {
          provide: Router,
          useValue: {
            get: () => true,
          }
        },
        {
          provide: Http,
          useValue: {
            get: () => true,
          }
        },
        {
          provide: DataService,
          useValue: {
            get: () => true,
          }
        },
        {
          provide: MdSnackBar,
          useValue: {
            open: () => true,
          }
        }
      ]
    });
  });

  it('should ...', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
