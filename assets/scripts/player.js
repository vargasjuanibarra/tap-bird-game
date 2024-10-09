class Player {
     constructor(game) {
        this.game = game;
        this.x = 20;
        this.y;
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width;
        this.height;
        this.speedY;
     }
     draw(){
        this.game.ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        )
     }
     update() {

         // if (this.x >= this.game.width - this.width) {
         //    this.x += 5
         // }
         this.y += this.speedY
         if (!this.isTouchingBottom()) {
            this.speedY += this.game.gravity;
         }

         // bottom boudary

         if (this.isTouchingBottom()) {
            this.y = this.game.height - this.height;
         }
         // top boundary
         if (this.isTouchingTop()) {
            // this.y = 0;
         }

     }

     resize() {
      this.width = this.spriteWidth * this.game.ratio;
      this.height = this.spriteHeight * this.game.ratio;
      this.y = this.game.height * 0.5 - this.height * 0.5
      this.speedY = -5 * this.game.ratio;
     }

     isTouchingTop() {
      return this.y <= 0;
     }

     isTouchingBottom() {
      return this.y >= this.game.height - this.height
     }

     flap() {
      if (!this.isTouchingTop()) {
         this.speedY = -5 * this.game.ratio
      }
     }
}

