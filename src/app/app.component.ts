import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VotoComponent } from './components/voto/voto.component'; // ✅ ruta corregida

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StarInfluence';
}

