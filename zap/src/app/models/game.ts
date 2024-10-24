import { ArrayType } from '@angular/compiler';

export class Game {
  public players: string[] = ['Justin', 'Sarah', 'Alex','Ahmet'];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public playerHands: { [player: string]: string[] } = {}; 

  constructor() {
    const colors = ['blue', 'green', 'orange', 'yellow'];
    const numbers = Array.from({ length: 13 }, (_, i) => i);
    const wildcards = ['wildcard-0', 'wildcard-1'];

    // Kartenstapel für Farben und Nummern erstellen
    for (let x = 0; x < 2; x++) {
      colors.forEach((color) => {
        numbers.forEach((num) => {
          this.stack.push(`${color}-${num}`);
        });
      });
    }

    // Wildcards hinzufügen
    for (let y = 0; y < 4; y++) {
      wildcards.forEach((wildcard) => this.stack.push(wildcard));
    }
    shuffle(this.stack);
  }
}

  function shuffle(array: any) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
