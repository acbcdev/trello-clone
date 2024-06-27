import { Component, Injector, effect, inject, signal, PLATFORM_ID } from '@angular/core';
import { type CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from '@app/services/data.service';
import type { Column, Row, TDialog } from '@app/types/data';
import { ColumnHeaderComponent } from '../column-header/column-header.component';
import { DialogRowsComponent } from '../dialog-rows/dialog-rows.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { ItemComponent } from '../item/item.component';
import { AddColumnComponent } from '../add-column/add-column.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [DragDropModule, ColumnHeaderComponent, DialogRowsComponent, AddItemComponent, ItemComponent, AddColumnComponent, FontAwesomeModule],
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.css',
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
  faXmark = faXmark
  faPlus = faPlus
  dataService = inject(DataService)
  columns = this.dataService.columns

  title = 'trello-clone';
  itemDialog = signal<TDialog | null>(null)

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
  initColumns() {
    const columns = localStorage.getItem('columns');
    if (columns) this.dataService.columns.set(JSON.parse(columns));
    else this.dataService.initColumns();
    this.trackColumns();
  }
  platform = inject(PLATFORM_ID)
  injector = inject(Injector)
  ngOnInit() {
    console.log(this.platform)
    if (this.platform === 'web') {
      this.initColumns()
    }

    this.initColumns()
  }
  trackColumns() {
    effect(
      () => {
        const columns = this.dataService.columns()
        localStorage.setItem('columns', JSON.stringify(columns));
      },
      { injector: this.injector }
    );
  }

  toggleAdditionState(columnId: Column['id']) {
    this.dataService.columns.update((prev) => prev.map((column) => (
      column.id === columnId
        ? { ...column, isAdding: !column.isAdding }
        :
        { ...column, isAdding: false }
    )))
  }
  removeItem(columnId: Column['id'], RowId: Row['id']) {
    this.dataService.columns.update((prev) => prev.map((column) => (
      column.id === columnId
        ? { ...column, items: column.items.filter((item) => item.id !== RowId) }
        : column
    )))
  }

  toggleOpen(columnId: Column['id'], RowId: Row['id']) {
    this.dataService.columns.update((prev) => prev.map((column) => (
      column.id === columnId
        ? {
          ...column, items: column.items.map((item) => {
            if (item.id === RowId) {
              const itemToogle = { ...item, isOpen: !item.isOpen, list: column.title, ColumnId: columnId };
              this.itemDialog.set(itemToogle)
              console.log(this.itemDialog()?.isOpen)
              return itemToogle
            }
            return { ...item, isOpen: false }
          }
          )
        }
        : column
    )))
  }
  closeModal() {
    this.dataService.columns.update((prev) => prev.map((column) => (
      { ...column, items: column.items.map(item => ({ ...item, isOpen: false })) }
    )))
    this.itemDialog.set(null)
  }

}
