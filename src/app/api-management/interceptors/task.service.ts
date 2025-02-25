import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http-service/http.service';
import { IdbService } from '../idb-service/idb.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private httpService = inject(HttpService)
  private idbService = inject(IdbService)
  /** Checks if user is online */
  private isOnline(): boolean {
    return navigator.onLine;
  }

  /** Get all tasks */
  getTasks(): Observable<Task[]> {
    return this.isOnline() ? this.httpService.getTasks() : this.idbService.getTasks();
  }

  /** Get a single task */
  getTask(id: number): Observable<Task | undefined> {
    return this.isOnline() ? this.httpService.getTask(id) : this.idbService.getTask(id);
  }

  /** Add a new task */
  addTask(task: Task): Observable<void> {
    return this.isOnline() ? this.httpService.addTask(task) : this.idbService.addTask(task);
  }

  /** Update an existing task */
  updateTask(task: Task): Observable<void> {
    return this.isOnline() ? this.httpService.updateTask(task) : this.idbService.updateTask(task);
  }

  /** Delete a task */
  deleteTask(id: number): Observable<void> {
    return this.isOnline() ? this.httpService.deleteTask(id) : this.idbService.deleteTask(id);
  }
}
