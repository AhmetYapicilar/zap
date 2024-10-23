import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlayersComponent } from '../players/players.component';


@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule,PlayersComponent,],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {


  handOut() {
  }
  
}
