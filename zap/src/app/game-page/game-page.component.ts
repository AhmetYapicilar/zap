import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlayersComponent } from '../players/players.component';
import { Game } from '../models/game';


@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule,PlayersComponent,],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  game: Game;
  playerHands: { [key: string]: string[] }; // Objekt, um die Hände der Spieler zu speichern

  constructor() {
    this.game = new Game();
    this.playerHands = {}; // Initialisiert ein leeres Objekt für die Spielerhände

    // Spielerhände initialisieren
    this.game.players.forEach((player) => {
      this.playerHands[player] = []; // Jede Spielerhand als leeres Array initialisieren
    });
  }

  handOut() {
    const numberOfCards = 7; // Anzahl der Karten pro Spieler

    this.game.players.forEach((player) => {
      for (let j = 0; j < numberOfCards; j++) {
        const card = this.game.stack.pop();
        if (card) {
          this.playerHands[player].push(card); // Karten an den entsprechenden Spieler austeilen
        } else {
          console.error('Keine Karten mehr im Stapel!');
        }
      }
    });
    console.log('Karten ausgeteilt:', this.playerHands);
  }

  // Methode, um einem Spieler nur seine eigenen Karten zu zeigen
  showPlayerCards(player: string): string[] | undefined {
    return this.playerHands[player]; // Gibt nur die Karten des angeforderten Spielers zurück
  }
  playCard(playerIndex: number, cardIndex: number) {
    if (this.playerHands[playerIndex] && this.playerHands[playerIndex][cardIndex]) {
      const playedCard = this.playerHands[playerIndex].splice(cardIndex, 1)[0]; // Karte aus der Hand entfernen
      console.log(`${this.game.players[playerIndex]} spielt die Karte: ${playedCard}`);
      // Hier kannst du weitere Logik hinzufügen, z.B. die Karte in einen Ablagestapel verschieben
    } else {
      console.error('Ungültige Karte oder kein Spieler vorhanden.');
    }
  }

}

