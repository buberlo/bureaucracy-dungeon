import Phaser from 'phaser';
import { formCards } from '../data/formCards';
import { rooms } from '../data/rooms';
import type { FormCardData, RoomData } from '../game/types';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create(): void {
    this.generateTextures();
    this.loadGameData();
    this.scene.start('DungeonScene');
  }

  private generateTextures(): void {
    const g = this.add.graphics();

    g.fillStyle(0x2b2b3a, 1);
    g.fillRect(0, 0, 32, 32);
    g.lineStyle(1, 0x44445a, 1);
    g.strokeRect(0, 0, 32, 32);
    g.generateTexture('floor', 32, 32);

    g.clear();
    g.fillStyle(0x555566, 1);
    g.fillRect(0, 0, 32, 32);
    g.lineStyle(1, 0x222233, 1);
    g.strokeRect(0, 0, 32, 32);
    g.generateTexture('wall', 32, 32);

    g.clear();
    g.fillStyle(0x3d7bd6, 1);
    g.fillCircle(16, 16, 12);
    g.fillStyle(0xffffff, 1);
    g.fillRect(10, 10, 4, 4);
    g.fillRect(20, 10, 4, 4);
    g.generateTexture('player', 32, 32);

    g.clear();
    g.fillStyle(0xd64b4b, 1);
    g.fillCircle(16, 16, 12);
    g.fillStyle(0x222222, 1);
    g.fillRect(9, 12, 4, 4);
    g.fillRect(19, 12, 4, 4);
    g.generateTexture('monster', 32, 32);

    g.clear();
    g.fillStyle(0x8e5bd6, 1);
    g.fillRect(2, 2, 28, 28);
    g.fillStyle(0xffffff, 1);
    g.fillRect(8, 8, 16, 4);
    g.fillRect(8, 16, 16, 4);
    g.generateTexture('auditor', 32, 32);

    g.clear();
    g.fillStyle(0xf5f5f5, 1);
    g.fillRect(0, 0, 48, 64);
    g.lineStyle(1, 0x888888, 1);
    g.strokeRect(0, 0, 48, 64);
    g.fillStyle(0x333333, 1);
    g.fillRect(6, 10, 36, 4);
    g.fillRect(6, 22, 36, 4);
    g.fillRect(6, 34, 24, 4);
    g.generateTexture('form-card', 48, 64);

    g.clear();
    g.fillStyle(0xb8232a, 1);
    g.fillRect(0, 0, 16, 64);
    g.fillStyle(0xffffff, 0.8);
    g.fillRect(4, 8, 8, 8);
    g.fillRect(4, 24, 8, 8);
    g.fillRect(4, 40, 8, 8);
    g.generateTexture('gate', 16, 64);

    g.clear();
    g.fillStyle(0xffd166, 1);
    g.fillCircle(16, 16, 12);
    g.lineStyle(2, 0x8a5a00, 1);
    g.strokeCircle(16, 16, 12);
    g.generateTexture('stamp', 32, 32);

    g.destroy();
  }

  private loadGameData(): void {
    const cards: FormCardData[] = formCards;
    const roomData: RoomData[] = rooms;

    if (!Array.isArray(cards) || cards.length === 0) {
      console.warn('[BootScene] No form cards loaded.');
    }

    if (!Array.isArray(roomData) || roomData.length === 0) {
      console.warn('[BootScene] No rooms loaded.');
    }

    this.game.registry.set('formCards', cards);
    this.game.registry.set('rooms', roomData);
    this.game.registry.set('bootComplete', true);
  }
}