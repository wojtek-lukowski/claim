import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClaimTableComponent } from "./components/claim-table/claim-table.component";
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root',
  imports: [ClaimTableComponent, FormsModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
