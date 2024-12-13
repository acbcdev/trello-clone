import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AddfocusDirective } from '@app/directive/addfocus.directive';
import { DataService } from '@app/services/data.service';
import type { Column, Row } from '@app/types/data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [AddfocusDirective, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './edit-item.component.html',
})
export class EditItemComponent {
  faXmark = faXmark;
  curentValue = input.required<Row>();
  columnId = input.required<Column['id']>();

  private dataService = inject(DataService);
  cancelEditing = output<void>();

  editItemInput = new FormControl('', { validators: [Validators.required] });
  cancelEdit() {
    this.cancelEditing.emit();
  }
  editItem() {
    const value = this.editItemInput.value;
    if (value?.trim() === '' || this.editItemInput.invalid) return;
    this.dataService.columns.update((prev) =>
      prev.map((column) =>
        column.id === this.columnId()
          ? {
              ...column,
              items: column.items.map((item) =>
                item.id === this.curentValue().id
                  ? { ...item, name: value ?? '', isEditing: false }
                  : item
              ),
            }
          : column
      )
    );
  }
}
