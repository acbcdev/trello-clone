import { Component, inject } from '@angular/core';
import { type CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from '@app/services/data.service';
import type { Column, Row } from '@app/types/data';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './columns.component.html',
  styles: `
  .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }
  .cdk-drag-placeholder {
  opacity: 0;
  }

  .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
  }
`
})
export class ColumnsComponent {
  dataService = inject(DataService)
  columns = this.dataService.columns
  title = 'trello-clone';
  drop(event: CdkDragDrop<Row[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

  }
  dropColumn(event: CdkDragDrop<Column[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
  addColumn() {
    console.log(this.dataService.columns())
    this.dataService.addColumn({ id: Math.floor(Math.random() * 1200), title: `Column ${this.dataService.columns().length + 1}`, items: [] })
  }
  addItem() {

  }
}
