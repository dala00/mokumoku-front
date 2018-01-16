import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../../../models/meeting';

@Component({
  selector: 'meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  @Input() meetings: Meeting[];
  @Input() showStarButton: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
