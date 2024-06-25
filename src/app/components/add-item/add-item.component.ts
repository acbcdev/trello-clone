import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import type { Column } from '@app/types/data';
@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  columnId = input.required<Column['id']>()
  private dataService = inject(DataService)
  createInput = new FormControl('', { validators: [Validators.required, Validators.nullValidator] })
  addItem(columnId: Column['id']) {
    const text = this.createInput.value
    const validteInput = text?.trim() === '' || !text

    if (this.createInput.invalid || validteInput) return
    this.dataService.addItem(columnId, { id: Math.floor(Math.random() * 120000), name: text, description: '', tags: [], isEditing: false, isOpen: false })
    this.createInput.reset()
  }
  cancelAddition(columnId: Column['id']) {
    this.dataService.columns.update((prev) => prev.map((column) => (
      column.id === columnId
        ? { ...column, isAdding: !column.isAdding }
        :
        column
    )))
    this.createInput.reset()
  }
}
