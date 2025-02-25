import { Component, effect, inject } from '@angular/core';
import { TaskService } from '../api-management/interceptors/task.service';
import { NetowrkDetectionService } from '../pwa-management/network-detection/netowrk-detection.service';

@Component({
  selector: 'completed-tasks',
  imports: [],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
  tasks: Task[] = [];
  private taskService = inject(TaskService)
  networkDetection = inject(NetowrkDetectionService)
  expandedTask: number | null = null;
  filterPriority = '';

  ngOnInit() {
    this.loadCompletedTasks();
  }


    loadTaskEffect = effect(() => {
      // Refresh list
      if (this.networkDetection.onlineStatus()) {
        console.log("online")
        this.loadCompletedTasks()
      } else {
        console.log("offline")
        this.loadCompletedTasks()
      }
    })

  /** Load completed tasks */
  loadCompletedTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks.filter(task => task.completed);
      },
      error: () => {
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

  /** Returns filtered completed task list */
  filteredTasks() {
    return this.tasks.filter(task =>
      ( task.completed && !this.filterPriority || task.priority === this.filterPriority)
    );
  }

  /** Delete a task */
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.loadCompletedTasks(); // Refresh list
      }
    });
  }
}
