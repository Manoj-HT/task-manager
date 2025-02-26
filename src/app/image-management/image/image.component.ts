import { Component, input } from '@angular/core';

@Component({
  selector: 'image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  src = input.required();
  
  /** Get image url */
  getSrc() {
    const numberedImage = Number(this.src()) + 1;
    console.log('/images/' + numberedImage + '.jpeg');
    return '/images/' + numberedImage + '.jpeg';
  }
}
