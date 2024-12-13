import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddfocusDirective } from '@app/directive/addfocus.directive';
import { DataService } from '@app/services/data.service';

import type { TDialog } from '@app/types/data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dialog-rows',
  standalone: true,
  imports: [ReactiveFormsModule, AddfocusDirective, FontAwesomeModule],
  templateUrl: './dialog-rows.component.html',
  styleUrl: './dialog-rows.component.css',
})
export class DialogRowsComponent {
  faPenToSquare = faPenToSquare;
  faXmark = faXmark;
  private dataService = inject(DataService);
  infoRow = input.required<TDialog | null>();
  close = output<boolean>();
  isEditingName = signal<boolean>(false);
  isEditingDescription = signal<boolean>(false);
  description = signal<string>('');
  name = signal<string>('');
  inputEditName = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  descriptionInput = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  ngOnInit() {
    // console.log('NG ON INIT', this.infoRow())
    this.description.set(this.infoRow()?.description ?? '');
    this.name.set(this.infoRow()?.name ?? '');
  }
  closeModal() {
    this.close.emit(true);
  }
  changeNameHandler() {
    const title = this.inputEditName.value;
    const validteInput = title?.trim() === '';
    if (this.inputEditName.invalid || validteInput) return;
    this.name.set(title ?? '');
    this.dataService.columns.update((prev) =>
      prev.map((column) =>
        column.id === this.infoRow()?.ColumnId
          ? {
              ...column,
              items: column.items.map((item) =>
                item.id === this.infoRow()?.id
                  ? { ...item, name: title ?? '' }
                  : item
              ),
            }
          : column
      )
    );
    this.inputEditName.reset();
    this.isEditingName.set(false);
  }
  handlerEditName() {
    this.inputEditName.setValue(this.name());
    this.isEditingName.set(!this.isEditingName());
  }
  handlerEditDescription() {
    this.descriptionInput.setValue(this.description());
    this.isEditingDescription.set(!this.isEditingDescription());
  }
  editDescription() {
    const text = this.descriptionInput.value;
    const validteInput = text?.trim() === '';
    if (this.descriptionInput.invalid || validteInput) return;
    this.description.set(text ?? '');
    this.dataService.columns.update((prev) =>
      prev.map((column) =>
        column.id === (this.infoRow()?.ColumnId ?? '')
          ? {
              ...column,
              items: column.items.map((item) =>
                item.id === (this.infoRow()?.id ?? '')
                  ? { ...item, description: text ?? '' }
                  : item
              ),
            }
          : column
      )
    );
    this.descriptionInput.reset();
    this.isEditingDescription.set(false);
    console.log(this.description());
  }
}
