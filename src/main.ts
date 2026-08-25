import Phaser from 'phaser';
import { gameConfig } from './game/config';

const container = document.querySelector<HTMLDivElement>('#game-container');

if (!container) {
  throw new Error('Game container #game-container not found.');
}

container.innerHTML = '';

const game = new Phaser.Game(gameConfig);

window.addEventListener('beforeunload', () => {
  game.destroy(true);
});

export default game;