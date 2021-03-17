import { Injectable } from '@angular/core';

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

  public reminders: Reminder[] = [
    {
      id:0,
      content: 'Conteudo',
      title: 'Titulo 123456799102',
      creationDate: new Date(),
      done: true,
      priority: 0,
    },
    {
      id:1,
      content: 'Conteudo 2',
      title: 'Titulo 2',
      creationDate: new Date(),
      done: true,
      priority: 0,
    }
  ];

  constructor() { }

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

  public checkAsDone(id : number) : void{
    this.reminders = this.reminders.map(reminder => {
      if(reminder.id == id){
        reminder.done = !reminder.done;
      }
      return reminder;
    })
  }

  public addReminder() : boolean{
    this.reminders.push({
      id:this.reminderNextId,
      title:'Titulo',
      content: 'Teste',
      creationDate: new Date(),
      done: false,
      priority: 0, 
    });
    this.reminderNextId++;
    return true;
  }

  public deleteReminder(id : number) : void{
    this.reminders = this.reminders.filter(reminder => {
      if(reminder.id !== id){
        return reminder;
      }
    })
  } 

}
