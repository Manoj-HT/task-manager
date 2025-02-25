import { Component, inject } from '@angular/core';
import { NavService } from '../navService/nav.service';

@Component({
  selector: 'bottom-bar',
  imports: [],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss'
})
export class BottomBarComponent {
  navService = inject(NavService)

  navigate(path: string){
    this.navService.routeTo(path)
  }
}
