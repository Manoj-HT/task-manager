import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'task-list',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'completed',
        loadComponent: () => import('./completed-tasks/completed-tasks.component').then(c => c.CompletedTasksComponent)
    },
    {
        path: 'add-tasks',
        loadComponent: () => import('./add-edit-tasks/add-edit-tasks.component').then(c => c.AddEditTasksComponent),
    },
    {
        path: 'edit-task/:taskId',
        loadComponent: () => import('./add-edit-tasks/add-edit-tasks.component').then(c => c.AddEditTasksComponent)
    },
    {
        path: 'images',
        loadComponent: () => import('./image-management/image-page/image-page.component').then(c => c.ImagePageComponent)
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
