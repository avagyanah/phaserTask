import { TEXTURE } from "./constants";

export class MainView extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
    this.i = 0;
  }

  _build() {
    this._addMainImages();
    this.mainImagesEvents();
  }

  addWindow() {
    let x = Phaser.Math.Between(0, 850);
    let y = Phaser.Math.Between(70, 475);
    let tab = this.scene.add
      .image(0, 0, TEXTURE, "window.png")
      .setOrigin(0)
      .setInteractive();
    let close = this.scene.add
      .image(120, 5, TEXTURE, "close.png")
      .setOrigin(0)
      .setInteractive();
    let minimize = this.scene.add
      .image(90, 5, TEXTURE, "minimize.png")
      .setOrigin(0)
      .setInteractive();

    this.container = this.scene.add.container(x, y, [tab, close, minimize]);
    // this.container.setSize(tab.width, tab.height);
    const inputShape = new Phaser.Geom.Rectangle(0, 0, 100, 100);
    this.container.setInteractive(inputShape, () => {
      console.log("esim xi");
    });

    this.container.on("pointerdown", this.dragStart, this);

    // close.on("pointerdown", function() {
    //   close.off("clicked", clickHandler);
    //   container.remove();
    //   console.log("asd");
    // });

    close.on(
      "pointerover",
      function() {
        close.setTint(0x000000);
      },
      this
    );
    close.on(
      "pointerout",
      function() {
        close.setTint(0xffffff);
      },
      this
    );
    minimize.on(
      "pointerover",
      function() {
        minimize.setTint(0x000000);
      },
      this
    );
    minimize.on(
      "pointerout",
      function() {
        minimize.setTint(0xffffff);
      },
      this
    );
    this.i++;
  }

  dragStart(pointer, targets) {
    console.warn("down");

    this.scene.off("pointerdown", this.dragStart, this);
    this.dragObj = targets[0];
    this.scene.on("pointermove", this.doDrag, this);
    this.scene.on("pointerup", this.stopDrag, this);
  }

  doDrag(pointer) {
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;
  }

  stopDrag(pointer, targets) {
    this.scene.on("pointerdown", this.dragStart, this);
    this.scene.off("pointermove", this.doDrag, this);
    this.scene.off("pointerup", this.stopDrag, this);
  }

  mainImagesEvents() {
    this.button.on("pointerdown", this.addWindow, this);
    this.button.on(
      "pointerover",
      function() {
        this.button.setTint(0xff9955);
      },
      this
    );
    this.button.on(
      "pointerout",
      function() {
        this.button.setTint(0xfffff);
      },
      this
    );

    this.startButton.on(
      "pointerover",
      function() {
        this.startButton.setTint(0xff0f00);
      },
      this
    );
    this.startButton.on(
      "pointerout",
      function() {
        this.startButton.setTint(0xfffff);
      },
      this
    );
  }

  _addMainImages() {
    this.bg = this.scene.add.image(0, 0, TEXTURE, "bg.png").setOrigin(0);
    this.button = this.scene.add
      .image(0, 0, TEXTURE, "button.png")
      .setOrigin(0)
      .setInteractive();
    this.bottomLine = this.scene.add
      .image(0, 550, TEXTURE, "bottomLine.png")
      .setOrigin(0);
    this.startButton = this.scene.add
      .image(0, 550, TEXTURE, "start.png")
      .setOrigin(0)
      .setInteractive()
      .setDepth(10);
  }
}
