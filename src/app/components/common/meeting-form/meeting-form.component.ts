import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import * as moment from 'moment';
import { HttpService } from '../../../services/http.service';
import { Meeting } from '../../../models/meeting';
import { MeetingImage } from '../../../models/meeting-image';
import { Tag } from '../../../models/tag';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {
  @Input() meeting: Meeting;
  @Input() submitLabel: string;
  @Output() onSubmit = new EventEmitter();
  private tags: string[];
  private autocompleteItems: string[];
  private searching = false;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    if (!this.meeting.start_time) {
      this.meeting.start_time = new Date();
    }
    if (!this.meeting.end_time) {
      this.meeting.end_time = new Date();
    }
    this.tags = [];
    if (this.meeting.tags) {
      this.meeting.tags.forEach((tag: Tag) => {
        this.tags.push(tag.name);
      });
    }
  }

  onTagChanged() {
    this.meeting.tags = [];
    this.tags.forEach((tagModel: any) => {
      let tag = new Tag;
      tag.name = tagModel.display;
      this.meeting.tags.push(tag);
    });
  }

  onTagTextChange(text: string) {
    if (this.searching) return;
    this.searching = true;
    this.http.get('api/tags/search?keyword=' + encodeURIComponent(text))
      .subscribe((res: Response) => {
        const tags: any = res.json().tags;
        let autocompleteItems: string[] = [];
        for (let tag_id in tags) {
          autocompleteItems.push(tags[tag_id]);
        }
        this.autocompleteItems = autocompleteItems;
        this.searching = false;
      });
  }

  parseUploadedUrl(response: Response): string {
    const meetingImage = response.json().meetingImage as MeetingImage;
    return `files/MeetingImages/${meetingImage.id}/image/${meetingImage.image}`;
  }

  onSubmitClicked() {
    this.onSubmit.emit(this.meeting);
  }
}
