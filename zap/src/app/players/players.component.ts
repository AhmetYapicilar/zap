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
  @Input() name:string = '';
  @Input() player: string = '';
  @Input() cardCount: number = 0;  // Anzahl der Karten
  @Input() playerActive: boolean = false;  // Anzahl der Karten

  constructor(private gamerService : GameService) {
    this.game = new Game();
    this.game.playerHands = {};
  }

  getPlayerCardCount(): number {
    return this.gamerService.getPlayerCardCount(this.player);
  }


}
