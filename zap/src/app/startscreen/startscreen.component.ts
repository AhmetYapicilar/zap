import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
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
export class StartscreenComponent {
  name: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Optional: Falls die Animation nach dem Laden der Seite gestartet werden soll.
    const spanElement = document.querySelector('.button-start-page > span');
    if (spanElement) {
      setTimeout(() => {
        spanElement.classList.add('animate');
      }, 500); // Verzögert die Animation um 500 ms
    }
  }

  startNewGame() {
    this.router.navigateByUrl('/game/');
  }
}