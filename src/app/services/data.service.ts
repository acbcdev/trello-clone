import { Injectable, signal } from '@angular/core';
import type { Column, Row } from '@app/types/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  columns = signal<Column[]>([{ id: 1, title: 'Column 1', items: [{ name: 'Row 1', id: 1, description: 'Description 1', tags: ['tag1', 'tag2'] }] }, { id: 2, title: 'Column 2', items: [{ name: 'Row 2', id: 2, description: 'Description 2', tags: ['tag3', 'tag4'] }] }])

  addColumn(column: Column) {
    this.columns.update((prev) => [...prev, column])
  }

  removeColumn(id: number) {
    this.columns.update((prev) => prev.filter((column) => column.id !== id))
  }
  addItem(columnId: Column['id'], item: Row) {
    this.columns.update((prev) => prev.map((column) => {
      if (column.id === columnId) {
        column.items.push(item)
      }
      return column
    }))
  }

}
