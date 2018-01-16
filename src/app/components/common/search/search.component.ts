import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyword = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  search() {
    if (this.keyword !== '') {
      this.router.navigate(['/meeting/search', {keyword: this.keyword}]);
    }
  }
}
