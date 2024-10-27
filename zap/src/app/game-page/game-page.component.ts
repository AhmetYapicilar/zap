import { CommonModule } from '@angular/common';
import { Component, inject,Input} from '@angular/core';
import { PlayersComponent } from '../players/players.component';
import { Game } from '../models/game';
import { StartscreenComponent } from '../startscreen/startscreen.component';
import { GameService } from '../game.service';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, collectionData,addDoc,docData,doc, updateDoc, } from '@angular/fire/firestore';



@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
  CommonModule,
  PlayersComponent,
  MatButtonModule, 
  MatDividerModule,
   MatIconModule
],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  game: Game;
  @Input() cardAmount: number = 0;
  @Input() name:string = ''; 
   spezifikPlayer ='';
   players: string[] = [];
   paramsId:string ='';
   firestore: Firestore = inject(Firestore);
   games$;
   games;

  constructor( private gamerService: GameService,private route: ActivatedRoute,) {
    this.game = new Game();
    this.game.playerHands = {}; // Initialisiert ein leeres Objekt für die Spielerhände
    this.players = this.gamerService.game.players;
    // Spielerhände initialisieren
    this.game.players.forEach((player) => {
      this.game.playerHands[player] = []; // Jede Spielerhand als leeres Array initialisieren
    });



    this.route.params.subscribe((params: any) => {
      this.paramsId = params.id;
    });

    this.games$ = docData(this.getSingleGameRef(this.paramsId));
    this.games = this.games$.subscribe((gameList:any) => {
      console.log(gameList.players);
    this.game.currentPlayer = gameList.currentPlayer;
    this.game.playedCards = gameList.playedCards;
    this.game.players = gameList.players;
    this.game.stack = gameList.stack;
    this.game.playerHands = gameList.playerHands;
    });
  }

  

  handOut() {
    const numberOfCards = 7; // Anzahl der Karten pro Spieler

    this.game.players.forEach((player) => {
      debugger;
      for (let j = 0; j < numberOfCards; j++) {
        const card = this.game.stack.pop();
        if (card) {
          this.game.playerHands[player].push(card); // Karten an den entsprechenden Spieler austeilen
        } else {
          console.error('Keine Karten mehr im Stapel!');
        }
      }
    });
    console.log('Karten ausgeteilt:', this.game.playerHands);
    const spezificPlayer = this.game.players[1];
    // console.log(this.game.playerHands[spezificPlayer].length);
    this.showHowManyCards();
    this.disableHandOutButton();
  }

  showHowManyCards() {
    for (let i = 0; i < this.game.players.length; i++) {
      // Wieviel Karten jeder hat
       this.spezifikPlayer = this.game.players[i];
      let name = this.game.playerHands[this.spezifikPlayer].length;
      console.log(name);
    }
  }

  // Methode, um einem Spieler nur seine eigenen Karten zu zeigen
  showPlayerCards(player: string): string[] | undefined {
    return this.game.playerHands[player]; // Gibt nur die Karten des angeforderten Spielers zurück
  }
  
  playCard(playerIndex: number, cardIndex: number) {
    if (this.game.playerHands[playerIndex] && this.game.playerHands[playerIndex][cardIndex]) {
      const playedCard = this.game.playerHands[playerIndex].splice(cardIndex, 1)[0]; // Karte aus der Hand entfernen
      console.log(`${this.game.players[playerIndex]} spielt die Karte: ${playedCard}`);
      // Hier kannst du weitere Logik hinzufügen, z.B. die Karte in einen Ablagestapel verschieben
    } else {
      console.error('Ungültige Karte oder kein Spieler vorhanden.');
    }
  }


  disableHandOutButton() {
    let handOut = document.getElementById('handOut') as HTMLButtonElement; // Typcasting auf HTMLButtonElement
    if (handOut) {
      handOut.disabled = true;  // Deaktiviert den Button
    } else {
      console.error('Button mit ID "handOut" nicht gefunden');
    }

  }
    
  getSingleGameRef(docId: string){
    return doc(collection(this.firestore, 'games'), docId);
    
  }
  }



  
  
