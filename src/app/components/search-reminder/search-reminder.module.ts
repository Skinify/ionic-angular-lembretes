import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchReminderComponent } from './search-reminder.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [SearchReminderComponent],
  exports: [SearchReminderComponent]
})
export class SearchReminderComponentModule {}
