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
    this.game.players.forEach((player) => {
      playerCardCounts[player] = this.getPlayerCardCount(player);
    });
    return playerCardCounts;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((arrayUnion: string) => {
      if (arrayUnion && arrayUnion.length > 0) {
        console.log(arrayUnion);
        this.game.players.push(arrayUnion);
        console.log(this.game.players);
        
        this.saveGame();
      }
    });
  }

  getSingleGameRef(docId: string) {
    return doc(collection(this.firestore, 'games'), docId);
  }
  saveGame() {
    // Nur den neuen Spieler zum bestehenden Array in Firestore hinzufügen
    const gameRef = this.getSingleGameRef(this.paramsId);
    updateDoc(gameRef, {
      players: arrayUnion(this.game.players[this.game.players.length - 1])
    });
  }
}
