import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game'
import { GamePageComponent } from '../game-page/game-page.component';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [GamePageComponent],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  constructor(private router: Router) {

  }

  starNewGame() {
    let game = new Game();
    this.router.navigateByUrl('/game/');
    console.log(game);
    
  }
}
