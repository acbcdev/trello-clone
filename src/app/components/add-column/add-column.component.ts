import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddfocusDirective } from '@app/directive/addfocus.directive';
import { DataService } from '@app/services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-add-column',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, AddfocusDirective],
  templateUrl: './add-column.component.html',

})
export class AddColumnComponent {
  faPlus = faPlus
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
