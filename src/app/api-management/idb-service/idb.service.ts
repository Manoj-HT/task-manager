import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  /** Initialize IndexedDB */
  private async initDB() {
    return await openDB('taskManagerDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  /** Get all tasks (returns an Observable) */
  getTasks(): Observable<Task[]> {
    return from(this.dbPromise.then(db => { return db.getAll('tasks') }));
  }

  /** Get a single task */
  getTask(id: number): Observable<Task | undefined> {
    return from(this.dbPromise.then(db => db.get('tasks', Number(id))));
  }

  /** Add a task */
  addTask(task: Task): Observable<void> {
    return from(
      this.dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readwrite');
        tx.store.add(task);
        return tx.done;
      })
    );
  }

  /** Update a task */
  updateTask(task: Task): Observable<void> {
    return from(
      this.dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readwrite');
        tx.store.put(task);
        return tx.done;
      })
    );
  }

  /** Delete a task */
  deleteTask(id: number): Observable<void> {
    return from(
      this.dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readwrite');
        tx.store.delete(id);
        return tx.done;
      })
    );
  }

  /** Add multiple taks at once */
  addOrUpdateMultipleTasks(tasks: Task[]): Observable<void> {
    if (!tasks.length) return new Observable<void>((observable) => {
      console.log("Failed to add")
      observable.next(undefined)
    });

    return from(
      this.dbPromise.then((db) => {
        const tx = db.transaction('tasks', 'readwrite');
        for (const task of tasks) {
          tx.store.put(task);
        }
        console.log(`✅ Bulk insert/update complete for ${tasks.length} tasks`);
        return tx.done;
      })
    )
  }
}
