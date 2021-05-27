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
  onInternet: Boolean;
  eventCheck: Boolean = false;

  constructor(
    private data: ReminderService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.onInternet = true;


    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== "0"){
      this.reminder = this.data.getReminderById(parseInt(id, 10))[0];
      this.id = this.reminder.id;
      this.title = this.reminder.title;
      this.content = this.reminder.content;
      this.creationDate = this.reminder.creationDate;
      this.eventCheck = this.reminder.event || false;
    }else{
      this.reminder = null;
      this.title = "";
      this.content = "";
      this.creationDate = null;
      this.eventCheck = false;
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
    if(this.title !== "" && this.content !== ""){
      if(this.id === 0){
        this.data.addReminder({
          id: 0,
          title: this.title,
          content: this.content,
          creationDate: new Date(),
          done:false,
        });
        this.location.back();
      }else{
        this.data.editReminder({
          id: this.id,
          title: this.title,
          content: this.content,
          creationDate: new Date(),
          done:false,
        })
        this.location.back();
      }
    }else{
      await this.presentAlert();
    }
  }

  async toggleHelp(texto : string){
    const alert = await this.alertController.create({
      header: 'Ajuda',
      message: texto,
      buttons: ['Confirmar']
    });

    await alert.present();
  }
}
