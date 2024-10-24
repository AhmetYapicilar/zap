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
  name:string = ''
  constructor(private router: Router) {

  }

  starNewGame() {
    let game = new Game();
    this.router.navigateByUrl('/game/');
    console.log(game);
    
  }
}
