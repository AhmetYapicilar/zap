import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlayersComponent } from '../players/players.component';
import { Game } from '../models/game';


@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule,PlayersComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  game: Game;
  playerHands: string[][] = [];

  constructor() {
    this.game = new Game();
    this.game.players = ['Justin', 'Sarah', 'Alex']; // Spieler hinzufügen
    this.playerHands = this.game.players.map(() => []); // Spielerhände initialisieren
  }
  handOut() {
    const numberOfCards = 7; // Anzahl der Karten pro Spieler
  
    this.game.players.forEach((player, index) => {
      for (let j = 0; j < numberOfCards; j++) {
        const card = this.game.stack.pop();
        if (card) { // Prüft, ob card nicht undefined ist
          this.playerHands[index].push(card); // Karten an den Spieler austeilen
          console.log(this.game.stack);
          
        } else {
          console.error('Keine Karten mehr im Stapel!');
        }
      }
    });
    console.log('Karten ausgeteilt:', this.playerHands);
  }
  
}

