import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StartscreenComponent } from '../startscreen/startscreen.component';
import { DialogComponent } from '../dialog/dialog.component';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    StartscreenComponent,DialogComponent
  ],
  templateUrl: './dialog-joingame.component.html',
  styleUrls: ['./dialog-joingame.component.scss']
})
export class DialogJoinGameComponent {
  gameID: string = 'e0CZxX0V0kccdnhdQwle';
  startScreen = StartscreenComponent;
  constructor(private router: Router, public dialogRef: MatDialogRef<DialogJoinGameComponent>, private gamerService: GameService) {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigateToURL(gameID: string){
    this.router.navigateByUrl('/game/' + gameID);  
    this.gamerService.openDialog();
  }

  
}
