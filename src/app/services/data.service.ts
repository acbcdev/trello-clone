import { Injectable, signal } from '@angular/core';
import type { Column, Row } from '@app/types/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  columns = signal<Column[]>([])

  addColumn(title: Column['title']) {
    this.columns.update((prev) => [...prev, { id: crypto.randomUUID(), title, items: [], isAdding: false, isEditing: false }])
  }



  removeColumn(id: Column['id']) {
    this.columns.update((prev) => prev.filter((column) => column.id !== id))
  }
  addItem(columnId: Column['id'], item: Row) {
    this.columns.update((prev) => prev.map((column) => {
      if (column.id === columnId) {
        return { ...column, items: [...column.items, item], }
      }
      return column
    }))
  }
  editItem(columnId: Column['id'], item: Row) {
    this.columns.update((prev) => prev.map((column) => (column.id === columnId ? { ...column, items: column.items.map((i) => i.id === item.id ? item : i) } : column)))

  }
  editColumn(id: Column['id'], title: Column['title']) {
    this.columns.update((prev) => prev.map((column) => {
      if (column.id === id) {
        column.title = title
      }
      return column
    }))
  }
}
