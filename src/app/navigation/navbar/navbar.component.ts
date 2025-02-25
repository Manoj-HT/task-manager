import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';

@Component({
  selector: '[navbar]',
  imports: [SideBarComponent, BottomBarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
