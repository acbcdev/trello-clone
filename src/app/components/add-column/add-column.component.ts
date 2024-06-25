import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'app-add-column',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-column.component.html',

})
export class AddColumnComponent {
  private dataService = inject(DataService)
  createInput = new FormControl('')
  isAdding = signal(false)
  addColumn() {
    const title = this.createInput.value
    if (title?.trim() === '' || !title) return
    this.dataService.addColumn(title)
    this.toogleAddColumn()
  }
  toogleAddColumn() {
    this.isAdding.set(!this.isAdding())
  }
}
