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
  @Input() selecting : boolean = false;
  @Input() selectedReminders: Array<boolean> = []

  selected : boolean = false;

  constructor() { }

  ngOnInit() {}

  
  ngOnChanges() {
    if(!this.selecting){
      this.selected = false;
    }
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  setDone(id : number){
    if(this.selecting)
      return
    this.reminderService.checkAsDone(id);
  }

  toggleSelected(id : number) : void{
    if(!this.selecting)
      return

    this.selected = !this.selected;
    this.selectedReminders[id] = this.selected
  }
}
