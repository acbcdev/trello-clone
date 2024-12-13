import { Component, output } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [DragDropModule, FontAwesomeModule],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  faXmark = faXmark;
  faEdit = faEdit;
  open = output<boolean>();
  remove = output<boolean>();
  edit = output<boolean>();

  toggleOpen() {
    this.open.emit(true);
  }
  editItem() {
    this.edit.emit(true);
  }
  removeItem() {
    this.remove.emit(true);
  }
}
