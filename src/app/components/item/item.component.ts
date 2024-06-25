import { Component, output } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  //TOGGLE OPEN OUTPUT
  open = output<boolean>()
  remove = output<boolean>()
  //INPUT NAME IDS
  toggleOpen() {
    this.open.emit(true)
  }

  removeItem() {
    this.remove.emit(true)
  }
}
