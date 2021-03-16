import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReminderPage } from './reminder.page';

import { IonicModule } from '@ionic/angular';

import { ReminderPageRoutingModule } from './reminder-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReminderPageRoutingModule
  ],
  declarations: [ReminderPage]
})
export class ReminderPageModule {}
