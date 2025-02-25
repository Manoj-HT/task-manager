import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreComponent } from './core/core/core.component';
import { NetowrkDetectionService } from './pwa-management/network-detection/netowrk-detection.service';
import { RemindersService } from './pwa-management/reminders/reminders.service';

@Component({
  selector: 'app-root',
  imports: [CoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager';

  private networkDetection = inject(NetowrkDetectionService)
  isOnline = this.networkDetection.onlineStatus
  private reminder = inject(RemindersService)

  ngOnInit() {
    this.reminder.requestPermission()
  }
}
