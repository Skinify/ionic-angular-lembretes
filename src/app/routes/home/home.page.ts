import { Component } from '@angular/core';
import { ReminderService, Reminder } from '../../services/reminder.service'
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public reminderService: ReminderService, private alertController: AlertController) {
    this.init()
  }

  selectedReminders : Array<boolean> = []
  selecting : boolean = false;
  toggleFirstVisitAnimation: boolean = false;

  async init () {
    let firstVisit = await this.reminderService.getFirstVisit()
    if(firstVisit === true || firstVisit === null){
      const alert = await this.alertController.create({
        header: 'Bem vindo',
        message: 'Por favor clique em "Lembretes" para saber um pouco mais sobre o app',
        buttons: [{
          text:"Confirmar", handler: () => this.toggleFirstVisitAnimation = true
        }],
      });
      await alert.present();
    }
  }
  
  getReminders(): Reminder[] {
    return this.reminderService.getReminders();
  }

  setRemindeAsDone(id : number): void {
    return this.reminderService.checkAsDone(id);
  }

  toggleHold() : void{
    this.selectedReminders = []
    this.selecting = true
  }

  quitSelection() : void{
    this.selectedReminders = []
    this.selecting = false;
  }

  deleteReminders() : void{
    if(this.selectedReminders.length > 0){
      this.selectedReminders.forEach((selected, index) => {
        if(selected){
          this.reminderService.deleteReminder(index)
        }
      })
    }
    this.reminderService.syncStorage()
    this.selecting = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.getReminders(), event.previousIndex, event.currentIndex);
    this.reminderService.syncStorage();
  }

  clickingMore() : void {
    this.reminderService.openingAboutUs();
  }

  showFirstVisitAnimation () : boolean{
    return this.toggleFirstVisitAnimation && this.reminderService.firstVisit;
  }
}
