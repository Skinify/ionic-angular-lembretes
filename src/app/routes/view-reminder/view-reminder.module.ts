import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewReminderPage } from './view-reminder.page';

import { IonicModule } from '@ionic/angular';

import { ViewReminderPageRoutingModule } from './view-reminder-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReminderPageRoutingModule
  ],
  declarations: [ViewReminderPage]
})
export class ViewReminderPageModule {}
