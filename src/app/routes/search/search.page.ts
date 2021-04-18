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

  searchInputModel : string = "";

  public getReminders() : Reminder[]{
    return this.reminderService.filterByTitle(this.searchInputModel);
  }

  ngOnInit(){
    setTimeout(() =>{
      this.searchInput.setFocus();
    },150)
  }
}
