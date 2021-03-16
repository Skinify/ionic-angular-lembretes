import { Component, OnInit, Input } from '@angular/core';
import { Reminder, ReminderService } from '../../services/reminder.service'

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  @Input() reminder: Reminder 
  @Input() reminderService : ReminderService 

  constructor() { }

  ngOnInit() {}

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  setDone(id : number){
    console.log(id);
    this.reminderService.checkAsDone(id);
  }

}
