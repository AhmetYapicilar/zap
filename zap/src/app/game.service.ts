import { Injectable } from '@angular/core';
import { Game } from './models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game;

  constructor() {
    this.game = new Game();
    this.game.playerHands = {};

    // Spielerhände initialisieren
    this.game.players.forEach((player) => {
      this.game.playerHands[player] = [];
    });
  }

  // Funktion, um die Anzahl der Karten eines bestimmten Spielers zu erhalten
  getPlayerCardCount(player: string): number {
    return this.game.playerHands[player]?.length || 0;
  }

  // Funktion, um die Anzahl der Karten aller Spieler zu erhalten
  getAllPlayerCardCounts(): { [player: string]: number } {
    const playerCardCounts: { [player: string]: number } = {};
    this.game.players.forEach(player => {
      playerCardCounts[player] = this.getPlayerCardCount(player);
    });
    return playerCardCounts;
  }
}
