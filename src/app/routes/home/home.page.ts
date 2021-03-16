import { Component } from '@angular/core';
import { ReminderService, Reminder } from '../../services/reminder.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private reminders: ReminderService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getReminders(): Reminder[] {
    return this.reminders.getReminders();
  }

  setRemindeAsDone(id : number): void {
    return this.reminders.checkAsDone(id);
  }

}
