import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReminderService, Reminder } from '../../services/reminder.service'

@Component({
  selector: 'app-view-message',
  templateUrl: './view-reminder.page.html',
  styleUrls: ['./view-reminder.page.scss'],
})
export class ViewReminderPage implements OnInit {
  public reminder: Reminder;

  creationDateFormated : string = "";
  eventDateFormated : string = "";

  constructor(
    private data: ReminderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.reminder = this.data.getReminderById(parseInt(id, 10))[0];
    this.creationDateFormated = this.reminder.creationDate.toLocaleDateString();
    this.eventDateFormated = this.reminder.event ? this.reminder.eventDate.toLocaleDateString() : ""
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
