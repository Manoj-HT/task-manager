import { Component, inject } from '@angular/core';
import { NavService } from '../navService/nav.service';

@Component({
  selector: 'side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  navService = inject(NavService)

  navigate(path: string){
    this.navService.routeTo(path)
  }
}
