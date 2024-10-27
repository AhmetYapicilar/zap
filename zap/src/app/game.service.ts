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
    dialogRef.afterClosed().subscribe((inputName: string) => {
      if (inputName && inputName.length > 0) {
        console.log(inputName);
        this.game.players.push(inputName);
        this.saveGame();
      }
    });
  }

  getSingleGameRef(docId: string) {
    return doc(collection(this.firestore, 'games'), docId);
  }

  saveGame() {
    updateDoc(this.getSingleGameRef(this.paramsId), this.game.toJson());
  }
}
