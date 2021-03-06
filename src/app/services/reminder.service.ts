import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Reminder {
  id:number,
  title: string,
  content:string,
  creationDate: Date,
  done:boolean,
  event:boolean,
  cep?:string,
  street?: string,
  number?: number,
  eventDate?: Date,
}

@Injectable({
  providedIn: 'root'
})

export class ReminderService {
  private reminderNextId = 1;
  public reminders: Reminder[] = [];
  public firstVisit : boolean = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init(){
    this.storage = await this.storage.create();
    let savedReminders = await this.storage.get('reminders');
    let nextId = await this.storage.get('nextId')
    this.firstVisit = await this.storage.get('firstVisit');
    if(this.firstVisit === null){
      this.firstVisit = true;
    }
    if(savedReminders !== null){
      this.reminders = savedReminders;
      if(nextId !== null){
        this.reminderNextId = nextId
      }
    }
  }

  public getReminderById(id: number){
    return this.reminders.filter((reminder) => {
      if(reminder.id === id){
        return reminder;
      }
    });
  }

  public toggleHelp(){
    
  }

  public getReminders() : Reminder[]{
    return this.reminders;
  }

  public async firstTimeGetReminders() : Promise<Reminder[]>{
    return await this.storage.get('reminders');
  }

  public checkAsDone(id : number) : void{
    this.reminders = this.reminders.map(reminder => {
      if(reminder.id == id){
        reminder.done = !reminder.done;
      }
      return reminder;
    })
    this.syncStorage()
  }

  public editReminder(reminder : Reminder) : void{
    this.reminders = this.reminders.map(rem => {
      if(reminder.id === rem.id){
        rem.title = reminder.title
        rem.content = reminder.content
        rem.event = reminder.event
        rem.cep = reminder.event ? reminder.cep : null
        rem.street = reminder.event ? reminder.street : null
        rem.number = reminder.event ? reminder.number : null
        rem.eventDate = reminder.event ? new Date(reminder.eventDate) : null
      }
      return rem;
    })
    this.syncStorage()
  }

  public addReminder(reminder : Reminder) : void{
    this.reminders.push({
      id:this.reminderNextId,
      title:reminder.title,
      content: reminder.content,
      creationDate: reminder.creationDate,
      done: reminder.done,
      event: reminder.event,
      cep:reminder.event ? reminder.cep : null,
      street:reminder.event ? reminder.street : null,
      number:reminder.event ? reminder.number : null,
      eventDate: reminder.event ? new Date(reminder.eventDate) : null
    });
    this.syncStorage()
  }

  public deleteReminder(id : number) : void{
    this.reminders = this.reminders.filter(reminder => {
      if(reminder.id !== id){
        return reminder;
      }
    })
    //this.syncStorage()
  } 

  public async syncStorage() : Promise<void>{
    try{
      this.reOrderIds();
      await this.storage.set('reminders', this.reminders);
      await this.storage.set('nextId', this.reminderNextId);
    }catch(err){
      console.log(err)
    }
  }

  private reOrderIds() : void{
    this.reminders = this.reminders.map((reminder,index) => {
      reminder.id = index + 1
      return reminder
    })
    this.reminderNextId = this.reminders.length + 1
  }

  public filterByTitle(filter : string) : Reminder[]{
    if(filter === null || filter === "" ){
      return this.reminders;
    }

    let filterKeyWords = filter.split(" ");

    let unorderedReminders : any = this.reminders.filter(reminder =>{
      let reminderTitleKeyWords = reminder.title.toLocaleLowerCase().split(" ");
      let matchingKeys = 0;
      reminderTitleKeyWords.forEach(titleKeyword => {
        filterKeyWords.forEach(filterKew => {
          if(filterKew !== ""){
            if(titleKeyword.includes(filterKew)){
              matchingKeys++;
            }
          }
        })
      });
      if(matchingKeys != 0){
        return {
          ...reminder,
          matchs: matchingKeys,
        }
      }

    })

    unorderedReminders = unorderedReminders.sort((a,b) =>{
      if(a.matchs < b.matchs){
        return -1;
      }
      if(a.matchs > b.matchs){
        return 1;
      }
      return 0;
    })

    return unorderedReminders;
  }

  public async openingAboutUs() : Promise<void>{
    this.firstVisit = false;
    await this.storage.set('firstVisit', false);
  }

  public async getFirstVisit() : Promise<boolean>{
    return await this.storage.get('firstVisit');
  }
}
