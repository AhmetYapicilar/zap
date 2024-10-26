import { Component, AfterViewInit } from '@angular/core';import { Router } from '@angular/router';
import { Game } from '../models/game'
import { GamePageComponent } from '../game-page/game-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [GamePageComponent,CommonModule,FormsModule],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent implements AfterViewInit {
  name: string = '';

  constructor(private router: Router) {}

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
    
  }
}
