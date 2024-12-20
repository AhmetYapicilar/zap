import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { PlayersComponent } from '../players/players.component';
import { Game } from '../models/game';
import { StartscreenComponent } from '../startscreen/startscreen.component';
import { GameService } from '../game.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  docData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    CommonModule,
    PlayersComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent implements OnInit {
  game: Game;
  @Input() cardAmount: number = 0;
  @Input() name: string = '';
  spezifikPlayer = '';
  players: string[] = [];
  paramsId: string = '';
  firestore: Firestore = inject(Firestore);
  games$;
  games;
  cardInTheMiddle: any = '';
  wildcards = ['wildcard-0', 'wildcard-1'];
  colors = ['blue', 'green', 'orange', 'yellow'];

  constructor(
    private gamerService: GameService,
    private route: ActivatedRoute
  ) {
    this.game = new Game();
    this.firestore = inject(Firestore);

    this.route.params.subscribe((params: any) => {
      this.paramsId = params.id;
    });

    this.games$ = docData(this.getSingleGameRef(this.paramsId));
    this.games = this.games$.subscribe((gameList: any) => {
      if (gameList) {
        this.game.currentPlayer = gameList.currentPlayer;
        this.game.playedCards = gameList.playedCards;
        this.game.players = gameList.players;
        this.game.stack = gameList.stack;
        this.game.playerHands = gameList.playerHands || {}; // Stellt sicher, dass playerHands ein Objekt ist

        // Initialisiert playerHands, falls es nicht aus Firestore geladen wurde
        this.game.players.forEach((player) => {
          if (!this.game.playerHands[player]) {
            this.game.playerHands[player] = []; // Initialisiert jede Spielerhand als leeres Array, falls undefiniert
          }
        });
      }
    });
  }

  ngOnInit() {
    this.games$ = docData(this.getSingleGameRef(this.paramsId));
    this.games$.subscribe((gameData: any) => {
      if (gameData) {
        // Prüfen, ob playerHands bereits Karten enthält
        if (Object.keys(gameData.playerHands).length > 0) {
          this.game.playerHands = gameData.playerHands;
        }
        this.game.players = gameData.players;
        this.game.stack = gameData.stack;
      }
    });
  }

  handOut() {
    const numberOfCards = 12;
    // Karten an alle Spieler austeilen
    this.game.players.forEach((player) => {
      // Initialisieren, falls noch nicht vorhanden
      if (!this.game.playerHands[player]) {
        this.game.playerHands[player] = [];
      }

      // Karten an den Spieler verteilen
      for (let j = 0; j < numberOfCards; j++) {
        const card = this.game.stack.pop(); // Karte von oben im Stapel entfernen
        if (card) {
          this.game.playerHands[player].push(card); // Karte zur Hand des Spielers hinzufügen
        } else {
          console.error('Keine Karten mehr im Stapel!');
          break;
        }
      }
    });
    this.showCurrentCard();
    // this.gamerService.savePlayerHandsAndStack();
    // this.gamerService.savePlayerHandsAndStack();
    this.game.currentPlayer = this.game.currentPlayer = Math.floor(
      Math.random() * this.game.players.length
    );
  }

  showCurrentCard() {
    // Definiere eine Liste der ungültigen Karten
    const invalidCards = [
      'blue-10.png',
      'blue-11.png',
      'blue-12.png',
      'green-10.png',
      'green-11.png',
      'green-12.png',
      'orange-10.png',
      'orange-11.png',
      'orange-12.png',
      'yellow-10.png',
      'yellow-11.png',
      'yellow-12.png',
      'wildcard-0.png',
      'wildcard-1.png',
    ];

    // Wiederhole das Ziehen und Zurücklegen, bis eine gültige Karte gefunden wird
    do {
      // Ziehe eine Karte von oben im Stapel und füge die Dateiendung hinzu
      this.cardInTheMiddle = this.game.stack.pop() + '.png';

      // Prüfe, ob die Karte ungültig ist
      if (invalidCards.includes(this.cardInTheMiddle)) {
        // Falls ungültig, lege die Karte unten in den Stapel zurück
        this.game.stack.unshift(this.cardInTheMiddle);
        console.log('Ungültige Karte zurückgelegt:', this.cardInTheMiddle);
      }
    } while (invalidCards.includes(this.cardInTheMiddle)); // Wiederhole, falls die Karte ungültig ist
    this.game.currentCard = this.cardInTheMiddle;
    // Gib die gültige Karte aus
    console.log('Die Karte ist gültig:', this.cardInTheMiddle);
  }

  showHowManyCards() {
    for (let i = 0; i < this.game.players.length; i++) {
      // Wieviel Karten jeder hat
      this.spezifikPlayer = this.game.players[i];
      let name = this.game.playerHands[this.spezifikPlayer].length;
    }
  }

  // Methode, um einem Spieler nur seine eigenen Karten zu zeigen
  showPlayerCards(player: string): string[] | undefined {
    return this.game.playerHands[player]; // Gibt nur die Karten des angeforderten Spielers zurück
  }

  playCard(card: string, player: string) {
    const currentCard = this.game.currentCard;
    if (this.isPlayable(card, currentCard)) {
      this.updateVariables(card, player);
      console.log(`Karte gespielt: ${card}`); // Gibt in der Konsole aus, welche Karte gespielt wurde
    } else if (this.currentCardIsATakeTwoCard(card, currentCard)) {
      console.log('Ziehe 2 Karten');
      this.playTakeTwoCardOnTakeTwoCard(card, currentCard, player)
    }
  }

  updateVariables(card: any, player: any){
    this.game.currentCard = card + '.png'; // Setzt die gespielte Karte als die neue Karte in der Mitte
      this.game.playedCards.push(card); // Fügt die Karte der Liste der gespielten Karten hinzu
      const playerHand = this.game.playerHands[player];

      this.removeCardFromPlayerHand(playerHand, card);

      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
  }

  getCardColorsAndNumbers(card: any, currentCard:any){
    let [cardColor, cardNumber] = card.split('-');
    let [currentColor, currentNumber] = currentCard.split('-');
    currentNumber = currentNumber.split('.png');
    currentNumber = currentNumber[0];
    return {cardColor, cardNumber, currentColor, currentNumber};
  }

  isPlayable(card: any, currentCard: any) {
    let {cardColor, cardNumber, currentColor, currentNumber} = this.getCardColorsAndNumbers(card, currentCard);
    if (currentNumber < 10) {
      return (
        cardColor === currentColor || // Gleiche Farbe
        cardNumber === currentNumber
      );
    } else {
      return false;
    }
  }

  currentCardIsATakeTwoCard(card: any, currentCard: any) {
    let {cardColor, cardNumber, currentColor, currentNumber} = this.getCardColorsAndNumbers(card, currentCard);
    if (currentNumber == 10) {
      return true;
    } else {
      return false;
    }
  }

  playTakeTwoCardOnTakeTwoCard(card: any, currentCard: any, player: any){
    let {cardColor, cardNumber, currentColor, currentNumber} = this.getCardColorsAndNumbers(card, currentCard);
    if (cardNumber == 10){
      this.game.currentCard = card + '.png'; // Setzt die gespielte Karte als die neue Karte in der Mitte
      this.game.playedCards.push(card); // Fügt die Karte der Liste der gespielten Karten hinzu
      const playerHand = this.game.playerHands[player];

      this.removeCardFromPlayerHand(playerHand, card);

      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      console.log(`Karte gespielt: ${card}`); // Gibt in der Konsole aus, welche Karte gespielt wurde
    } else {
      this.takeTwoCards();
    }
  }

  takeCardFromStack() {
    let card: any = this.game.stack.pop();
    this.game.playerHands['Ahmet'].push(card);
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
  }

  takeTwoCards() {
    for (let i = 0; i < 2; i++) {
      let card: any = this.game.stack.pop();
      this.game.playerHands['Ahmet'].push(card);
    }
  }

  removeCardFromPlayerHand(playerHand: any, card: any) {
    // Finden des Indexes der Karte, die entfernt werden soll
    const index = playerHand.indexOf(card);

    // Prüfen, ob die Karte in der Hand des Spielers existiert
    if (index !== -1) {
      // Entfernt die Karte an der Position 'index'
      playerHand.splice(index, 1);
    }
  }

  disableHandOutButton() {
    let handOut = document.getElementById('handOut') as HTMLButtonElement; // Typcasting auf HTMLButtonElement
    if (handOut) {
      handOut.disabled = true; // Deaktiviert den Button
    } else {
      console.error('Button mit ID "handOut" nicht gefunden');
    }
  }

  getSingleGameRef(docId: string) {
    return doc(collection(this.firestore, 'games'), docId);
  }
}
