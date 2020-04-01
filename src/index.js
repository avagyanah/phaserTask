import Phaser from "phaser";
import { Game } from "./game";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1000,
  height: 600,
  scene: []
};

const game = new Game(config);
