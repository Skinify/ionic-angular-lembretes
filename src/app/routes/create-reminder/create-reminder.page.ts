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
  onInternet: boolean;
  eventCheck: boolean = false;
  cep?:string;
  street?:string;
  number?:number;
  eventDate?:Date;


  weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"]
  now = new Date();

  today:string = `${this.weekDays[this.now.getDay()]} ${this.now.getDate()}, ${this.now.getFullYear()}}`

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
      this.cep = this.reminder.cep;
      this.street = this.reminder.street;
      this.number = this.reminder.number;
      this.eventDate = this.reminder.eventDate;
    }else{
      this.reminder = null;
      this.title = "";
      this.content = "";
      this.creationDate = null;
      this.eventCheck = false;
      this.cep = null;
      this.street = null;
      this.number = null;
      this.eventDate = null;
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
    if(this.title === "" || this.content === "")
      return await this.presentAlert();

    if(this.eventCheck)
      if(this.cep === "" || this.street === "" || this.number === null || this.eventDate === null)
        return await this.presentAlert();

    if(this.id === 0){
        this.data.addReminder({
          id: 0,
          title: this.title,
          content: this.content,
          creationDate: new Date(),
          done:false,
          event:this.eventCheck,
          cep:this.cep,
          street:this.street,
          number:this.number,
          eventDate:this.eventDate
        });
        this.location.back();
      }else{
        this.data.editReminder({
          id: this.id,
          title: this.title,
          content: this.content,
          creationDate: new Date(),
          done:false,
          event:this.eventCheck,
          cep:this.cep,
          street:this.street,
          number:this.number,
          eventDate:this.eventDate
        })
        this.location.back();
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
