class Obstacle {
    constructor(game, x) {
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeight = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.y = Math.random() * (this.game.height - this.scaledHeight);
        this.x = x;
        this.speedY = Math.random() < 0.5 ? -1 * this.game.ratio : 1 * this.game.ratio;
        this.markForDeletion = false;

        this.collisionX;
        this.collisionY;
        this.collisionRadius = this.scaledWidth * 0.5;
    }

    update() {
        this.x -= this.game.speed;
        this.y += this.speedY;
        this.collisionX = this.x + this.scaledWidth * .5;
        this.collisionY = this.y + this.scaledHeight * .5;
        if (this.y <= 0 || this.y >= this.game.height -this.scaledHeight ){
            this.speedY *= -1
        }
        if(this.isOfScreen()) {
            this.markedForDeletion = true;
            this.game.obstacles = this.game.obstacles.filter(obstacle => 
                !obstacle.markedForDeletion
            )
            this.game.score++;
            console.log(this.game.score)
            if (this.game.obstacles.length <= 0) {
                this.game.gameOver = true;
            }
        }
        if(this.game.checkCollision(this, this.game.player)) {
            this.gameOver = true;
            this.game.player.collided = true;
        }
    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight)
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2)
        this.game.ctx.stroke()
    }

    resize() {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
    }
    isOfScreen() {
        return this.x < -this.scaledWidth;
    }
}