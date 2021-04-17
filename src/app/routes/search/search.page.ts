import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReminderService, Reminder } from '../../services/reminder.service'

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  constructor(private reminderService: ReminderService) {}

  @ViewChild('searchInput') searchInput ;

  public searchTextChanged(text : string){
    console.log(text);
  }

  public getReminders() : Reminder[]{
    return this.reminderService.getReminders();
  }

  ngOnInit(){
    setTimeout(() =>{
      this.searchInput.setFocus();
    },150)
  }
}
