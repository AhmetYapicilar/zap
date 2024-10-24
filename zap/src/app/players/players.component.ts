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
<<<<<<< HEAD
  @Input() name:string = '';
  @Input() player: string = '';
  constructor(private gamerService : GameService) {
=======
  cardAmount: number = 0;
  @Input() name: string = '';
  constructor(private gameService: GameService) {
>>>>>>> a7ae176e0c4dab35318ddfb890ce4408b1295076
    this.game = new Game();
    this.game.playerHands = {};
  }

<<<<<<< HEAD
  getPlayerCardCount(): number {
    return this.gamerService.getPlayerCardCount(this.player);
  }


=======
>>>>>>> a7ae176e0c4dab35318ddfb890ce4408b1295076
}
