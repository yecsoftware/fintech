import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'u-form-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './u-form-section.component.html',
  styleUrls: ['./u-form-section.component.scss']
})
export class UFormSectionComponent {
  @Input() title!: string;
  @Input() collapsible = false;

  isCollapsed = false;

  toggleCollapse() {
    if (this.collapsible) {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
