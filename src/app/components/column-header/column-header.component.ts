import { Component, computed, inject, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import type { Column } from '@app/types/data';

@Component({
  selector: 'app-column-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './column-header.component.html',
  styleUrl: './column-header.component.css'
})
export class ColumnHeaderComponent {

  column = input.required<Column>()

  editColumnInput = new FormControl('')
  private dataService = inject(DataService)
  editNameColumn(columnId: Column['id']) {
    const title = this.editColumnInput.value
    const validteInput = title?.trim() === ''
    if (this.editColumnInput.invalid || validteInput) return
    this.dataService.editColumn(columnId, title ?? '')
    this.editColumnInput.reset()
    this.editColumnHandler(columnId)
  }

  editColumnHandler(columnId: Column['id']) {
    this.editColumnInput.setValue(this.column().title)
    this.dataService.columns.update((prev) => prev.map((column) => {
      if (column.id === columnId) {
        return { ...column, isEditing: !column.isEditing }
      }
      return { ...column, isEditing: false }
    }))
  }
}
