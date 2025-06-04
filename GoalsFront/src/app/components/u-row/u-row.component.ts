import { CommonModule } from '@angular/common';
import { Component ,Input} from '@angular/core';

@Component({
  selector: 'u-row',
  imports: [CommonModule],
  templateUrl: './u-row.component.html',
  styleUrl: './u-row.component.scss'
})
export class URowComponent {
  @Input() gap: string = '1rem';
  @Input() align?: 'end' | 'start' | 'center'| 'bottom';

  

}
