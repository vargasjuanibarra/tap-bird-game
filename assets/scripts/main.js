class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.background = new Background(this);
        this.player = new Player(this);
        this.obstacles = [];
        this.numberOfObstacles = 1;
        this.gravity;
        this.speed;
        this.score;
        this.gameOver;
        this.timer;
        this.message1;
        this.message2;

        this.resize(window.innerWidth, window.innerHeight)

        window.addEventListener('resize', (e) => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight)
   
        })
        // mouse controls
        this.canvas.addEventListener('mousedown', (e) => {
            this.player.flap()
        })
        // keyboard control
        window.addEventListener('keydown', (e) => {
            if(e.code === 'Space') {
                this.player.flap() 
            }
        })
        // touch control
        this.canvas.addEventListener('touchstart', (e) => {
            this.player.flap() 
        })
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'red'
        this.ctx.font = '15px Bungee'
        this.ctx.textAlign =  'end'
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = 'white';
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.ratio = this.height / this.baseHeight;

        this.gravity = .25 * this.ratio;
        this.speed = 2 * this.ratio;
        this.background.resize();
        this.player.resize();
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        })
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
    }
    render(deltaTime) {
        if(!this.gameOver) this.timer += deltaTime
        this.background.update()
        this.background.draw()
        this.drawStatusText()
        this.player.update()
        this.player.draw()
        this.obstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw();
        })
    }

    createObstacles() {
        this.obstacles = [];
        const firstX = this.baseHeight * this.ratio;
        const obstacleSpacing = 600 * this.ratio;
        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing))
        }
    }

    checkCollision(a, b) {
        const distanceX = a.collisionX - b.collisionX;
        const distanceY = a.collisionY - b.collisionY;
        const distance = Math.hypot(distanceX, distanceY);
        const sumOfRadius = a.collisionRadius + b.collisionRadius;
        return distance <= sumOfRadius
    }

    drawStatusText() {
        this.ctx.save();
        this.ctx.fillText('SCORE: ' + this.score, this.width - 10, 50)
        this.ctx.textAlign = 'start'
        this.ctx.fillText('TIMER: ' + this.formatTimer(), 10, 50)
        this.ctx.restore();

        if(this.gameOver) {
            if(this.player.collided){
                this.message1 = "Getting rusty?"
                this.message2 = "Collision time " + this.formatTimer() + ' seconds!'
            } else if (this.obstacles.length <= 0) {
                this.message1 = 'Nailed It!';
                this.message2 = "Can you do it faster than " + this.formatTimer() + ' seconds?'

            }
            this.ctx.textAlign = 'center';
            this.ctx.font = '30px Bungee'
            this.ctx.fillText(this.message1, this.width * 0.5, this.height * 0.5 - 40);
            this.ctx.font = '15px Bungee'
            this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.5 - 20);
            this.ctx.fillText("Press R to try again!", this.width * 0.5, this.height * 0.5);
        }

    }

    formatTimer() {
        return (this.timer * 0.001).toFixed(1);
    }

}

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx)

    let lastTime = 0;
    
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(deltaTime);
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
})