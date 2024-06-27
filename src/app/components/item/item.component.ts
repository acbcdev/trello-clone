import { Component, output } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [DragDropModule, FontAwesomeModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  faXmark = faXmark
  open = output<boolean>()
  remove = output<boolean>()

  toggleOpen() {
    this.open.emit(true)
  }

  removeItem() {
    this.remove.emit(true)
  }
}
