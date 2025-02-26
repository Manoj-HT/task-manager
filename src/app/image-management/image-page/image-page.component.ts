import { Component } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { ImagePlaceholderComponent } from '../image-placeholder/image-placeholder.component';

@Component({
  selector: 'image-page',
  imports: [ImageComponent, ImagePlaceholderComponent],
  templateUrl: './image-page.component.html',
  styleUrl: './image-page.component.scss',
})
export class ImagePageComponent {
  arr = new Array(110);
}
