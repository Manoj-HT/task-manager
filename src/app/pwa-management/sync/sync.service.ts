import { inject, Injectable } from '@angular/core';
import { IdbService } from '../../api-management/idb-service/idb.service';
import { HttpService } from '../../api-management/http-service/http.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private db = inject(IdbService)
  private http = inject(HttpService)

  syncTasks() {
    console.log('🔄 Starting Sync Process...');
    const localTasks = this.db.getTasks();
    const remoteTasks = this.http.getTasks();
    forkJoin([localTasks, remoteTasks]).subscribe({
      next: ([localTasks, remoteTasks]) => {
        const tasksToPush = localTasks.filter(
          (local) => !remoteTasks.some((remote) => remote.id === local.id)
        );
        const tasksToPull = remoteTasks.filter(
          (remote) => !localTasks.some((local) => local.id === remote.id)
        );
        const tasksToUpdate = localTasks.filter((local) => {
          const remote = remoteTasks.find((r) => r.id === local.id);
          return remote && JSON.stringify(remote) !== JSON.stringify(local);
        });

        // scenario 1: overwrite local db
        // scenario 2: overwrite remote db
        // scenario 3: ask user to overwrite the db of preference
        
        this.addIntoIndexedDB(tasksToPull)
        this.pushToRemote(tasksToUpdate)

        console.log('⬆️ Pushing Tasks:', tasksToPush);
        console.log('⬇️ Pulling Tasks:', tasksToPull);
        console.log('🔄 Updating Tasks:', tasksToUpdate);
      }
    })
  }

  private addIntoIndexedDB(tasksToPull: Task[]) {
    this.db.addOrUpdateMultipleTasks(tasksToPull).subscribe({
      next: () => { console.log("Sync complete") },
      error: () => { console.log("Problems syncing") }
    })
  }

  private pushToRemote(taskToUpdate: Task[]) {
    this.http.pushAllTasks(taskToUpdate).subscribe({
      next: () => { console.log("Sync complete") },
      error: () => { console.log("Problems syncing") }
    })
  }
}
