import { Component } from '@angular/core';
import { ColumnsComponent } from '@app/components/columns/columns.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ColumnsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
