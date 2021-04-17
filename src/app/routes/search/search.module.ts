import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SearchPage } from './search.page';
import { SearchPageRoutingModule } from './search-routing.module';
import { SearchReminderComponentModule } from 'src/app/components/search-reminder/search-reminder.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchReminderComponentModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
