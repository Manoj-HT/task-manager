import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_URL = 'http://localhost:3000';
  private apiList = {
    getTaskList: 'get-tasks-list',
    getTask: 'get-task',
    addTask: 'add-task',
    addMultipleTasks: 'add-multiple-tasks',
    updateTask: 'update-task',
    deleteTask: 'delete-task'
  }
  private http = inject(HttpClient)

  /** Fetch all tasks */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL}/${this.apiList.getTaskList}`);
  }

  /** Get a single task */
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/${this.apiList.getTask}/${id}`);
  }

  /** Add a new task */
  addTask(task: Task): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/${this.apiList.addTask}`, task);
  }

  /** Update an existing task */
  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${this.apiList.updateTask}/${task.id}`, task);
  }

  /** Delete a task */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.apiList.deleteTask}/${id}`);
  }

  /** Push multiple tasks at once */
  pushAllTasks(tasks: Task[]) {
    return this.http.post<void>(`${this.API_URL}/${this.apiList.addMultipleTasks}`, tasks);
  }
}
