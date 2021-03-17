import { Component } from '@angular/core';
import { ReminderService, Reminder } from '../../services/reminder.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private reminders: ReminderService) {}

  selectedReminders : Array<boolean> = []
  selecting : boolean = false;
  
  getReminders(): Reminder[] {
    return this.reminders.getReminders();
  }

  setRemindeAsDone(id : number): void {
    return this.reminders.checkAsDone(id);
  }

  toggleHold() : void{
    this.selectedReminders = []
    this.selecting = true
  }

  quitSelection() : void{
    this.selectedReminders = []
    this.selecting = false;
  }

  deleteReminders() : void{
    if(this.selectedReminders.length > 0){
      this.selectedReminders.forEach((selected, index) => {
        if(selected){
          this.reminders.deleteReminder(index)
        }
      })
    }
    this.selecting = false;
  }

}
