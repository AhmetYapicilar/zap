import { Routes } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
    { path: '', component: StartscreenComponent },
    { path: 'game/', component: GamePageComponent },
];
