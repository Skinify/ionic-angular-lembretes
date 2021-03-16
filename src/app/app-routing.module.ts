import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./routes/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'reminder/:id',
    loadChildren: () => import('./routes/view-reminder/view-reminder.module').then( m => m.ViewReminderPageModule)
  },
  {
    path: 'reminder',
    loadChildren: () => import('./routes/reminder/reminder.module').then( m => m.ReminderPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
