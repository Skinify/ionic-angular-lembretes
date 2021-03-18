import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReminderComponent } from './reminder.component';
import {DragDropModule} from '@angular/cdk/drag-drop'

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule, DragDropModule],
  declarations: [ReminderComponent],
  exports: [ReminderComponent]
})
export class ReminderComponentModule {}
