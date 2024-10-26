import { Component, AfterViewInit } from '@angular/core';import { Router } from '@angular/router';
import { Game } from '../models/game'
import { GamePageComponent } from '../game-page/game-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [GamePageComponent,CommonModule,FormsModule, DialogComponent],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent implements AfterViewInit {
  name: string = '';

  constructor(private router: Router, public dialog: MatDialog) {}

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
    this.router.navigateByUrl('/game/');
<<<<<<< HEAD
    
=======
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Player Name:', result); // Verwende den Namen hier weiter
      }
    });
>>>>>>> 0d1aa547a8b019e6945c4560b63e7e0efb0b699f
  }
}
