import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateReminderPage } from './create-reminder.page';

import { IonicModule } from '@ionic/angular';

import { CreateReminderPageRoutingModule } from './create-reminder-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateReminderPageRoutingModule
  ],
  declarations: [CreateReminderPage]
})
export class CreateReminderPageModule {}
