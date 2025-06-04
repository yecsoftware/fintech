import { Component,Input } from '@angular/core';

@Component({
  selector: 'u-list-box',
  imports: [],
  templateUrl: './u-list-box.component.html',
  styleUrl: './u-list-box.component.scss'
})
export class UListBoxComponent {
  @Input() itemsSource: any[] = [];
  @Input() valueKey: string = '';

  items = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' }
  ];

  // Selected item
  selectedItem: any;

  // Handle item selection
  onItemSelect(item: any) {
    this.selectedItem = item;
    console.log('Selected item:', this.selectedItem);
  }

}
