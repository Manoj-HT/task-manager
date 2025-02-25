import { updateTask } from './../../../../backend/handlers';
import { inject, Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { IdbService } from '../../api-management/idb-service/idb.service';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class RemindersService {
  db = inject(IdbService)
  swPush = inject(SwPush)

  requestPermission() {
    from(Notification.requestPermission()).subscribe({
      next: (permission: NotificationPermission) => {
        if (permission == "granted") {
          console.log("Notification permission granted.");
          this.getNextReminder()
        }
        if (permission == "denied") {
          console.warn("Notification permission denied.");
        }
      }
    })
  }

  sendNotification(data: Reminder) {
    if (Notification.permission === "granted") {
      new Notification(data.title, {
        body: data.subtext,
        icon: "icons/icon-96x96.png",
        requireInteraction: true,
        silent: false,
      });
    }
  }

  getNextReminder(): void {
    this.db.getTasks().subscribe({
      next: (tasks) => {
        const now = Date.now();
        const nextObj = []
        for (let task of tasks) {
          if (task.dueDate) {
            const time = new Date(task.dueDate).getTime()
            time > now ? nextObj.push(task) : undefined
          }
        }
        const futureReminders = tasks.filter((task) => task.dueDate ? new Date(task.dueDate as string).getTime() > now : false)
        const nextReminder = futureReminders.sort((a, b) => a.dueDate ? new Date(a.dueDate as string).getTime() - new Date(b.dueDate as string).getTime() : NaN)[0] || null;
        const delay = new Date(nextReminder.dueDate as string).getTime() - Date.now()
        if (delay > 0) {
          console.log(`Next notification in ${delay / 1000} seconds`);
          setTimeout(() => {
            this.playNotificationSound()
            this.sendNotification({
              title: nextReminder.title,
              subtext: nextReminder.description,
              date: nextReminder.dueDate as string,
            });
          }, delay);
        }
      }
    })
  }

  playNotificationSound() {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(error => console.error("Audio playback error:", error));
  }
}
