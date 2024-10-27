import { Component, AfterViewInit, inject } from '@angular/core';import { Router } from '@angular/router';
import { Game } from '../models/game'
import { GamePageComponent } from '../game-page/game-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData,addDoc,docData,doc, } from '@angular/fire/firestore';
import { DialogJoinGameComponent } from '../dialog-joingame/dialog-joingame.component';
import { GameService } from '../game.service';


@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [GamePageComponent,CommonModule,FormsModule, DialogComponent, DialogJoinGameComponent],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent implements AfterViewInit {
  firestore: Firestore = inject(Firestore);
  name: string = '';

  constructor(private router: Router, public dialog: MatDialog, private gamerService: GameService) {}

  ngAfterViewInit() {
    // Starte die Animation erst, wenn die Ansicht vollständig geladen ist
    const spanElement = document.querySelector('.button-start-page > span');
    const startBoxElement = document.querySelector('.start-box');

    if (spanElement && startBoxElement) {
      setTimeout(() => {
        // Animationen starten
        spanElement.classList.add('animate-fade-in');
        startBoxElement.classList.add('animate-slide-in');
      }, 100); // Optional: kurze Verzögerung, damit alles flüssig wirkt
    }
  }

  startNewGame() {
    let game = new Game();
    addDoc(this.getGameRef(), game.toJson())
    .then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
    this.gamerService.openDialog();
  }

  joinGame() {
    // let game = new Game();
    // let gameCollecton = collection(this.firestore, 'games');
    // addDoc(this.getGameRef(), game.toJson()).then((gameInfo)=> {
    //   console.log(gameInfo);
    //   this.router.navigateByUrl('/game/' + gameInfo.id);
      
    // })
    this.openDialogToJoinGame();
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  openDialogToJoinGame(): void{
    const dialogRef = this.dialog.open(DialogJoinGameComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('GameID:', result); // Verwende den Namen hier weiter
      }
    });
  }
}
