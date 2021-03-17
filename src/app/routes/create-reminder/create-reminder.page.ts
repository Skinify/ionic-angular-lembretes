import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReminderService, Reminder } from '../../services/reminder.service'

@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.page.html',
  styleUrls: ['./create-reminder.page.scss'],
})
export class CreateReminderPage implements OnInit {
  public reminder: Reminder;
  private editing: boolean = false;

  constructor(
    private data: ReminderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id === null){
      this.editing = true;
    }else{
      this.reminder = this.data.getReminderById(parseInt(id, 10))[0];
      console.log(this.reminder)
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
