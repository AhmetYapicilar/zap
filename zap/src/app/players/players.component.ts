import { Component, OnInit, Input, input } from '@angular/core';
import { Game } from '../models/game';
import { GamePageComponent } from '../game-page/game-page.component';
import { GameService } from '../game.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [GamePageComponent],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent {
  game: Game;
  cardAmount: number = 0;
  @Input() name: string = '';
  constructor(private gameService: GameService) {
    this.game = new Game();
    this.game.playerHands = {};
  }

}
