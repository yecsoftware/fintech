import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'u-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './u-pagination.component.html',
  styleUrls: ['./u-pagination.component.scss']
})
export class UPaginationComponent {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
