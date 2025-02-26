import { effect, inject, Injectable, signal } from '@angular/core';
import globalStyles from '../../styles/styles';
import { SyncService } from '../sync/sync.service';

@Injectable({
  providedIn: 'root'
})
export class NetowrkDetectionService {
  onlineStatus = signal(navigator.onLine)
  private root = document.documentElement;
  private sync = inject(SyncService)

  constructor() {
    window.addEventListener('online', () => this.onlineStatus.update(() => true));
    window.addEventListener('offline', () => this.onlineStatus.update(() => false));
  }

  /** Side effect for online staus */
  colors = effect(() => {
    if (this.onlineStatus()) {
      this.onlineFn()
    } else {
      this.offLineFn()
    }
  })

  /** fn to execute when app is online */
  onlineFn() {
    this.root.style.setProperty('--theme-bg', globalStyles.colors.themeBg);
    this.root.style.setProperty('--theme', globalStyles.colors.theme);
    this.sync.syncTasks()
  }

  /** fn to execute when app is offline */
  offLineFn() {
    this.root.style.setProperty('--theme-bg', globalStyles.colors.offlineBg);
    this.root.style.setProperty('--theme', globalStyles.colors.offlineFg);
  }
}
