import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { AddEditTasksComponent } from './add-edit-tasks/add-edit-tasks.component';

export const routes: Routes = [
    {
        path: 'task-list',
        loadComponent: () => DashboardComponent
    },
    {
        path: 'completed',
        loadComponent: () => CompletedTasksComponent
    },
    {
        path: 'add-tasks',
        loadComponent: () => AddEditTasksComponent,
    },
    {
        path: 'edit-task/:taskId',
        loadComponent: () => AddEditTasksComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'task-list'
    },
    {
        path: "**",
        pathMatch: 'full',
        redirectTo: 'task-list'
    }
];
