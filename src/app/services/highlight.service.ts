import { Injectable } from '@angular/core';

@Injectable()
export class HighlightService {

  constructor() { }

  initialize() {
      hljs.initHighlighting.called = false;
      setTimeout(() => hljs.initHighlighting(), 1000);
  }
}
