import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ReminderService, Reminder } from '../../services/reminder.service'
import { Location } from "@angular/common";

@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.page.html',
  styleUrls: ['./create-reminder.page.scss'],
})
export class CreateReminderPage implements OnInit {
  public reminder: Reminder;
  @Input() id: number = 0;
  title: string = "";
  content: string = "";
  creationDate: Date = new Date();

  constructor(
    private data: ReminderService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== "0"){
      this.reminder = this.data.getReminderById(parseInt(id, 10))[0];
      this.id = this.reminder.id;
      this.title = this.reminder.title;
      this.content = this.reminder.content;
      this.creationDate = this.reminder.creationDate;
    }else{
      this.reminder = null;
      this.title = "";
      this.content = "";
      this.creationDate = null;
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Oops',
      message: 'Por favor preencha todos os campos',
      buttons: ['Confirmar']
    });

    await alert.present();
  }

  async addReminder(){
    if(this.id === 0){
      if(this.title !== "" && this.content !== ""){
        this.data.addReminder({
          id: 0,
          title: this.title,
          content: this.content,
          creationDate: new Date(),
          done:false,
          priority: 0
        });
        this.location.back();
      }else{
        await this.presentAlert();
      }
    }else{

    }
  }
}
