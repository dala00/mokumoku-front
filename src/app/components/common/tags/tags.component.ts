import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../../../models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @Input() tags: Tag[];
  @Input() size: string;
  @Input() link: boolean = false;

  constructor() { }

  ngOnInit() {
    if (!this.size) {
      this.size = 'normal';
    }
  }

}
