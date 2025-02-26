import { inject, Injectable } from '@angular/core';
import { IdbService } from '../../api-management/idb-service/idb.service';
import { HttpService } from '../../api-management/http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private db = inject(IdbService)
  private http = inject(HttpService)

  /** Sync tasks with online database */
  syncTasks() {
    console.log('🔄 Starting Sync Process...');
    const localTasks = this.db.getTasks();
    localTasks.subscribe({
      next: (tasks) => {
        this.pushToRemote(tasks)
      }
    })
  }

  /** push tasks to remote */
  private pushToRemote(taskToUpdate: Task[]) {
    console.log('⬆️ Pushing Tasks:', taskToUpdate);
    this.http.pushAllTasks(taskToUpdate).subscribe({
      next: () => { console.log("Sync complete") },
      error: () => { console.log("Problems syncing") }
    })
  }
}
