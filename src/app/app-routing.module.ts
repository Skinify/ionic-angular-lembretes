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
    path: 'create/reminder/:id',
    loadChildren: () => import('./routes/create-reminder/create-reminder.module').then( m => m.CreateReminderPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./routes/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./routes/search/search.module').then( m => m.SearchPageModule)
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
