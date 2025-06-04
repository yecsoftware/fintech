import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  date: Date = new Date();
  salary: number = 10000;
  name: string = 'Emre';
  work: string = '';
  todos: string[] = [];
  search: string = '';

  constructor() { }

  save(){
    this.todos.push(this.work);
    this.work = '';
  }
}
