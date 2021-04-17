import { Component, OnInit, Input } from '@angular/core';
import { Reminder, ReminderService } from '../../services/reminder.service'

@Component({
  selector: 'app-search-reminder',
  templateUrl: './search-reminder.component.html',
  styleUrls: ['./search-reminder.component.scss'],
})
export class SearchReminderComponent implements OnInit {
  @Input() reminder: Reminder 
  @Input() reminderService : ReminderService 

  constructor() { }

  ngOnInit() {}

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
