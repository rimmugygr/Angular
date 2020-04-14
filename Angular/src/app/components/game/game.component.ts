import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'Hello stranger';
  }

  ngOnInit(): void {
  }

  sayHello(value: string) {
    if (value !== ''){
      this.message = 'Hello ' + value;
    }
  }
}
