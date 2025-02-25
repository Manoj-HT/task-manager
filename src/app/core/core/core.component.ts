import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navigation/navbar/navbar.component';

@Component({
  selector: 'core',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss'
})
export class CoreComponent {

}
