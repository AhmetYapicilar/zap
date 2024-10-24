import { Component } from '@angular/core';
import { Game } from '../models/game';
import { GamePageComponent } from '../game-page/game-page.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [GamePageComponent],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  game: Game;

  constructor() {
    this.game = new Game();
    this.game.playerHands = {};
  }


}
