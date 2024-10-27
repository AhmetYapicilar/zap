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
    MatDialogClose
  ],
  templateUrl: './dialog-joingame.component.html',
  styleUrls: ['./dialog-joingame.component.scss']
})
export class DialogJoinGameComponent {
  gameID: string = '';

  constructor(private router: Router, public dialogRef: MatDialogRef<DialogJoinGameComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigateToURL(gameID: string){
    this.router.navigateByUrl('/game/' + gameID);
  }
}
