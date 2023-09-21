import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Lógica TypeScript para a animação
const ballsContainer = document.querySelector('.balls-container');

if (ballsContainer) {
    const numBalls = 3; // Número de bolinhas
    for (let i = 0; i < numBalls; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ballsContainer.appendChild(ball);
    }
}

  }

}
