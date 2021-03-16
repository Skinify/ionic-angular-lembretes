import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReminderPage } from './view-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReminderPageRoutingModule {}
