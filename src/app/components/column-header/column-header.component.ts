import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddfocusDirective } from '@app/directive/addfocus.directive';
import { DataService } from '@app/services/data.service';
import type { Column } from '@app/types/data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-column-header',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, AddfocusDirective],
  templateUrl: './column-header.component.html',
})
export class ColumnHeaderComponent {
  faXmark = faXmark;
  faPenToSquare = faPenToSquare;
  column = input.required<Column>();

  editColumnInput = new FormControl('');
  private dataService = inject(DataService);
  editNameColumn(columnId: Column['id']) {
    const title = this.editColumnInput.value;
    const validteInput = title?.trim() === '';
    if (this.editColumnInput.invalid || validteInput) return;
    this.dataService.editColumn(columnId, title ?? '');
    this.editColumnInput.reset();
    this.editColumnHandler(columnId);
  }

  editColumnHandler(columnId: Column['id']) {
    this.editColumnInput.setValue(this.column().title);
    this.dataService.columns.update((prev) =>
      prev.map((column) => {
        if (column.id === columnId) {
          return { ...column, isEditing: !column.isEditing };
        }
        return { ...column, isEditing: false };
      })
    );
  }

  removeColumn(id: Column['id']) {
    this.dataService.columns.update((prev) =>
      prev.filter((column) => column.id !== id)
    );
  }
}
