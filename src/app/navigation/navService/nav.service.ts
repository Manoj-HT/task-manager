import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private route = inject(Router)

  routes = [
    {
      title: "Completed tasks",
      path: 'completed'
    },
    {
      title: "Task list",
      path: 'task-list',
    },
    {
      title: "Add tasks",
      path: 'add-tasks'
    }
  ]

  routeTo(path: string){
    this.route.navigate([path])
  }
}
