import { Component, effect, inject, Input, input } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../api-management/interceptors/task.service';
import { NetowrkDetectionService } from '../pwa-management/network-detection/netowrk-detection.service';

@Component({
  selector: 'add-edit-tasks',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-tasks.component.html',
  styleUrl: './add-edit-tasks.component.scss'
})
export class AddEditTasksComponent {

  @Input() taskId!: number

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private taskService = inject(TaskService);

  taskForm!: FormGroup;
  isEditMode = false;

  /** Simulated local storage for tasks (replace with IndexedDB or API later) */
  tasks: Task[] = [];
  onlineStatus = inject(NetowrkDetectionService)
  editingTask!: Task;
  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: [''],
      completed: [false],
    });

    /** If task ID exists in the URL, fetch task and prefill form */
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTaskForEditing();
    }
  }

  netowrkStatusEffect = effect(() => {
    if (this.onlineStatus.onlineStatus()) {
      this.taskId ? this.loadTaskForEditing() : null
    } else {
      this.taskId ? this.loadTaskForEditing() : null
    }
  })

  /** Find the task by ID and update the form */
  loadTaskForEditing() {
    this.taskService.getTask(this.taskId).subscribe({
      next: (task) => {
        if (task) {
          this.editingTask = task;
          this.taskForm.patchValue(task);
        }
      }
    });
  }

  /** Handle form submission */
  onSubmit() {
    if (this.taskForm.invalid) return;
    const newTask: Task = {
      ...this.taskForm.value,
    };
    if (this.isEditMode) {
      // Update existing task
      this.taskService.updateTask({ ...newTask, id: this.editingTask.id }).subscribe(() => {
        this.router.navigate(['/task-list']);
      });
    } else {
      // Add new task
      this.taskService.addTask({ ...newTask, id: Date.now(), }).subscribe(() => {
        this.router.navigate(['/task-list']);
      });
    }

    // Navigate back to task list
    this.router.navigate(['/task-list']);
  }
}
