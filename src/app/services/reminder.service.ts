import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Reminder {
  id:number,
  title: string,
  content:string,
  creationDate: Date,
  done:boolean,
  priority: number,
}

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminderNextId = 1;
  public reminders: Reminder[] = [];

  constructor(private storage: Storage) {
    this.init();
   }

  async init(){
    this.storage = await this.storage.create();
    let savedReminders = await this.storage.get('reminders');
    let nextId = await this.storage.get('nextId')
    console.log(savedReminders)
    if(savedReminders !== null){
      this.reminders = savedReminders;
      if(nextId !== null){
        this.reminderNextId = nextId
      }
    }
  }

  public getNextPriority() : number{
    let newArr = this.reminders.sort((a,b) => {
      if(a.priority < b.priority){
        return -1;
      }
      if(a.priority < b.priority){
        return 1;
      }
      return 0;
    })
    return newArr[0].priority + 1;
  }

  public getReminderById(id: number){
    return this.reminders.filter((reminder) => {
      if(reminder.id === id){
        return reminder;
      }
    });
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
      priority:reminder.priority, 
    });
    this.syncStorage()
  }

  public deleteReminder(id : number) : void{
    this.reminders = this.reminders.filter(reminder => {
      if(reminder.id !== id){
        return reminder;
      }
    })
    this.syncStorage()
  } 

  private async syncStorage() : Promise<void>{
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
}
