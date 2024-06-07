import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColumnsComponent } from './components/columns/columns.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColumnsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
