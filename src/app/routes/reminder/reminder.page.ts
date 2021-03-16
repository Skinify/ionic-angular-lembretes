import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReminderService, Reminder } from '../../services/reminder.service'

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  public reminder: Reminder;

  constructor(
    private data: ReminderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("teste")
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.reminder = this.data.getReminderById(parseInt(id, 10));
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
