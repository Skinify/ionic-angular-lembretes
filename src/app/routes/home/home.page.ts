import { Component } from '@angular/core';
import { ReminderService, Reminder } from '../../services/reminder.service'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public reminderService: ReminderService) {}

  selectedReminders : Array<boolean> = []
  selecting : boolean = false;
  
  getReminders(): Reminder[] {
    return this.reminderService.getReminders();
  }

  setRemindeAsDone(id : number): void {
    return this.reminderService.checkAsDone(id);
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
          this.reminderService.deleteReminder(index)
        }
      })
    }
    this.reminderService.syncStorage()
    this.selecting = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.getReminders(), event.previousIndex, event.currentIndex);
    this.reminderService.syncStorage();
  }
}
