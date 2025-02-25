import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreComponent } from './core/core/core.component';
import { NetowrkDetectionService } from './pwa-management/network-detection/netowrk-detection.service';

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
}
