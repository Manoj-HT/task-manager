import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { HttpService } from '../http-service/http.service';
import { IdbService } from '../idb-service/idb.service';
import { RemindersService } from '../../pwa-management/reminders/reminders.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private httpService = inject(HttpService)
  private idbService = inject(IdbService)

  /** Checks if user is online */
  private isOnline(): boolean {
    return false;
  }

  /** Get all tasks */
  getTasks(): Observable<Task[]> {
    return this.isOnline() ? forkJoin([this.httpService.getTasks(), this.idbService.getTasks()]).pipe(map(res => res[0])) : this.idbService.getTasks();
  }

  /** Get a single task */
  getTask(id: number): Observable<Task | undefined> {
    return this.isOnline() ? forkJoin([this.httpService.getTask(id),this.idbService.getTask(id)]).pipe(map(res => res[0])) : this.idbService.getTask(id);
  }

  /** Add a new task */
  addTask(task: Task): Observable<void> {
    return this.isOnline() ? forkJoin([this.httpService.addTask(task), this.idbService.addTask(task)]).pipe(map( res => res[0])) : this.idbService.addTask(task);
  }

  /** Update an existing task */
  updateTask(task: Task): Observable<void> {
    return this.isOnline() ? forkJoin([this.httpService.updateTask(task),this.idbService.updateTask(task)]).pipe(map( res => res[0])) : this.idbService.updateTask(task);
  }

  /** Delete a task */
  deleteTask(id: number): Observable<void> {
    return this.isOnline() ? forkJoin([this.httpService.deleteTask(id), this.idbService.deleteTask(id)]).pipe(map( res => res[0])) : this.idbService.deleteTask(id);
  }
}
