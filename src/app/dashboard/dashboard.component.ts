import { Component, effect, inject } from '@angular/core';
import { TaskService } from '../api-management/interceptors/task.service';
import { NetowrkDetectionService } from '../pwa-management/network-detection/netowrk-detection.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tasks: Task[] = [];
  private taskService = inject(TaskService)
  private router = inject(Router)
  expandedTask: number | null = null;
  filterPriority = '';
  networkDetection = inject(NetowrkDetectionService)

  loadTaskEffect = effect(() => {
    // Refresh list
    if (this.networkDetection.onlineStatus()) {
      this.loadTasks()
    } else {
      this.loadTasks()
    }
  })

  /** Load tasks from API or IndexedDB */
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks.filter(task => !task.completed);
      },
      error: (err) => {
        this.tasks = []
      }
    });
  }

  /** Expand/collapse task details */
  toggleExpand(taskId: number) {
    this.expandedTask = this.expandedTask === taskId ? null : taskId;
  }

  /** Update filter by priority */
  updateFilter(event: Event) {
    this.filterPriority = (event.target as HTMLSelectElement).value;
  }

  /** Returns filtered task list */
  filteredTasks() {
    return this.tasks.filter(task =>
      (!task.completed) &&
      (!this.filterPriority || task.priority === this.filterPriority)
    );
  }

  /** Mark task as completed */
  completeTask(task: Task) {
    task.completed = true;
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.loadTasks(); // Refresh list
      },
      error: (err) => {
        console.warn(err)
      }
    });
  }

  /** Delete a task */
  editTask(taskId: number) {
    this.router.navigate(['/edit-task', taskId])
  }


}

