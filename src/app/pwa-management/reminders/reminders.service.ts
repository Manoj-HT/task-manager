import { inject, Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { from, isEmpty } from 'rxjs';
import { TaskService } from '../../api-management/interceptors/task.service';
@Injectable({
  providedIn: 'root',
})
export class RemindersService {
  db = inject(TaskService);
  swPush = inject(SwPush);
  timeOut!: ReturnType<typeof setTimeout>;
  delay!: number;
  /** Get request to show notifications */
  requestPermission(): void {
    from(Notification.requestPermission()).subscribe({
      next: (permission: NotificationPermission) => {
        if (permission == 'granted') {
          console.log('Notification permission granted.');
          this.getNextReminder();
        }
        if (permission == 'denied') {
          console.warn('Notification permission denied.');
        }
      },
    });
  }

  /** Send a system level notification */
  sendNotification(data: Reminder): void {
    if (Notification.permission === 'granted') {
      new Notification(data.title, {
        body: data.subtext,
        icon: 'icons/icon-96x96.png',
        requireInteraction: true,
        silent: false,
      });
    }
  }

  /** Finds the next available reminder and sets a timeout for that */
  getNextReminder(): void {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.db.getTasks().subscribe({
      next: (tasks) => {
        const now = Date.now();
        const nextObj = [];
        for (let task of tasks) {
          if (task.dueDate) {
            const time = new Date(task.dueDate).getTime();
            time > now ? nextObj.push(task) : undefined;
          }
        }
        const futureReminders = tasks.filter((task) =>
          task.dueDate
            ? new Date(task.dueDate as string).getTime() > now
            : false
        );
        if (futureReminders.length == 0) {
          return;
        }
        const nextReminder =
          futureReminders.sort((a, b) =>
            a.dueDate
              ? new Date(a.dueDate as string).getTime() -
                new Date(b.dueDate as string).getTime()
              : NaN
          )[0] || null;
        this.delay =
          new Date(nextReminder.dueDate as string).getTime() - Date.now();
        if (this.delay > 0) {
          this.applyReminder(nextReminder);
        }
      },
    });
  }

  /** Apply reminder based on task */
  setNextReminder(task: Task): void {
    const newDelay = new Date(task.dueDate as string).getTime() - Date.now();
    if (this.delay) {
      if (newDelay < this.delay) {
        clearTimeout(this.timeOut);
      }
    }
    this.delay = newDelay;
    this.applyReminder(task);
  }

  /** Logic for setting notification timer */
  private applyReminder(task: Task) {
    console.log(`Next notification in ${this.delay / 1000} seconds`);
    this.timeOut = setTimeout(() => {
      this.playNotificationSound();
      this.sendNotification({
        title: task.title,
        subtext: task.description,
        date: task.dueDate as string,
      });
    }, this.delay);
  }

  /** Uses audio file to simulate notification sound */
  playNotificationSound(): void {
    const audio = new Audio('/notification.mp3');
    audio
      .play()
      .catch((error) => console.error('Audio playback error:', error));
  }
}
