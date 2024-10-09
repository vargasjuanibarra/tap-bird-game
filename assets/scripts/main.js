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
        this.ctx.fillStyle = 'yellow'
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
    }
    render() {
        this.background.update()
        this.background.draw()
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

}

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 720;

    const game = new Game(canvas, ctx)
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render();
        if(!game.gameOver) {
            console.log(game.gameOver)
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
})