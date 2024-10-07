class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.player = new Player(this)
        this.gravity;

        this.resize(window.innerWidth, window.innerHeight)

        window.addEventListener('resize', (e) => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight)
   
        })
        // mouse controls
        this.canvas.addEventListener('mousedown', (e) => {
            console.log(e)
            this.player.flap()
        })
        // keyboard control
        window.addEventListener('keydown', (e) => {
            console.log(e)
            if(e.code === 'Space') {
                 this.player.flap() 
            }
        })
        // touch control
        this.canvas.addEventListener('touchstart', (e) => {
            console.log(e)
        })
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'pink'
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.ratio = this.height / this.baseHeight;
        this.gravity = .25 * this.ratio;
        this.player.resize();
        console.log(this.height, this.baseHeight, this.ratio)
    }
    render() {
        this.player.update()
        this.player.draw()
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
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
})