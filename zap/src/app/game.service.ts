import { Injectable, input } from '@angular/core';
import { Component, AfterViewInit, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from './models/game';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  docData,
  doc,
  updateDoc,
  arrayUnion,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game;
  firestore: Firestore = inject(Firestore);
  paramsId: string = 'e0CZxX0V0kccdnhdQwle';
  @Input() name: string = '';

  constructor(public dialog: MatDialog) {
    this.game = new Game();
    // this.game.playerHands = {};



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
    this.game.players.forEach((player) => {
      playerCardCounts[player] = this.getPlayerCardCount(player);
    });
    return playerCardCounts;
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogComponent);
  //   dialogRef.afterClosed().subscribe((newPlayer: string) => {
  //     if (newPlayer && newPlayer.length > 0) {
  //       console.log(newPlayer);
  //       this.game.players.push(newPlayer);
  
  //       // Speichern Sie den neuen Spieler und aktualisieren Sie Firestore
  //       this.saveGame(newPlayer);
  //     }
  //   });
  // }

  getSingleGameRef(docId: string) {
    return doc(collection(this.firestore, 'games'), docId);
  }
  // savePlayers() {
  //   // Nur den neuen Spieler zum bestehenden Array in Firestore hinzufügen
  //   const gameRef = this.getSingleGameRef(this.paramsId);
  //   updateDoc(gameRef, {
  //     players: arrayUnion(this.game.players[this.game.players.length - 1])
  //   });
  // }


  async savePlayerHandsAndStack() {
    console.log('Speichern von playerHands und stack direkt in Firestore');
    try {
      const gameRef = this.getSingleGameRef(this.paramsId);
  
      // Serialisierung, um sicherzustellen, dass die Datenstrukturen korrekt gespeichert werden
      await updateDoc(gameRef, {
        playerHands: JSON.parse(JSON.stringify(this.game.playerHands)),  // Serialisiert und vermeidet Referenzprobleme
        stack: [...this.game.stack]  // Direkte Kopie des Arrays
      });
      
      console.log('playerHands und stack erfolgreich in Firestore gespeichert');
    } catch (error) {
      console.error('Fehler beim Speichern der playerHands und stack:', error);
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((newPlayer: string) => {
      if (newPlayer && newPlayer.length > 0) {
        console.log(newPlayer);
        this.game.players.push(newPlayer);
        // Speichern Sie den neuen Spieler, ohne `players` zu überschreiben
        this.saveNewPlayer(newPlayer);
      }
    });
  }
  
  async saveNewPlayer(newPlayer: string) {
    try {
      const gameRef = this.getSingleGameRef(this.paramsId);
  
      // Nur den neuen Spieler zur Liste hinzufügen, ohne die vorhandenen Spieler zu überschreiben
      await updateDoc(gameRef, {
        players: arrayUnion(newPlayer)
      });
      console.log('Neuer Spieler erfolgreich in Firestore hinzugefügt');
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Spielers:', error);
    }
  }
}
