// Global variables
let canvas, pen, W, H;
let ship, enemies = [];
let enemyImage, shipImage, bulletImage;
let gameover = false, paused = false;
let score = 0, lives = 3, level = 1, powerups = [];

// ========== Load Images ==========
function loadImages() {
    enemyImage = new Image();
    shipImage = new Image();
    bulletImage = new Image();

    enemyImage.src = "Images/enemy.png";
    shipImage.src = "Images/player.png";
    bulletImage.src = "Images/bullet.png";
}

// ========== Initialize Game ==========
function init() {
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;

    gameover = false;
    paused = false;
    score = 0;
    level = 1;
    lives = 3;
    enemies = [];
    powerups = [];

    loadImages();

    ship = {
        x: W / 2 - 25,
        y: H - 60,
        w: 50,
        h: 50,
        speed: 25,
        bullets: [],

        update: function () { },

        draw: function () {
            pen.drawImage(shipImage, this.x, this.y, this.w, this.h);
        },

        shoot: function () {
            let b = new Bullet(this.x + this.w / 2 - 2, this.y, 10);
            this.bullets.push(b);
        }
    };

    // Spawn one enemy at start
    enemies.push(new Enemy(50, 20, 3));

    document.addEventListener("keydown", buttonGotPressed);
}

// ========== Bullet Class ==========
class Bullet {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.w = 4;
        this.h = 14;
        this.state = "active";
        this.speed = speed;
    }

    draw() {
        pen.drawImage(bulletImage, this.x, this.y, this.w, this.h);
    }

    update() {
        this.y -= this.speed;
        if (this.y <= 0) this.state = "inactive";
    }
}

// ========== Enemy Class ==========
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.state = "active";
        this.speed = speed;
    }

    draw() {
        pen.drawImage(enemyImage, this.x, this.y, this.w, this.h);
    }

    update() {
        this.x += this.speed;

        if (this.x >= W - this.w || this.x <= 0) {
            this.speed *= -1;
        }

        this.y += 0.5; // enemies move slowly downward

        if (this.y + this.h >= H) {
            this.state = "inactive";
            lives--;
            if (lives <= 0) {
                gameover = true;
            }
        }
    }
}

// ========== Controls ==========
function buttonGotPressed(e) {
    if (gameover) {
        if (e.key === "r" || e.key === "R") startGame(); // Restart
        return;
    }

    if (e.key === " ") ship.shoot();
    if (e.key === "ArrowLeft") ship.x = Math.max(0, ship.x - ship.speed);
    if (e.key === "ArrowRight") ship.x = Math.min(W - ship.w, ship.x + ship.speed);
    if (e.key === "p" || e.key === "P") paused = !paused;
    if (e.key === "r" || e.key === "R") startGame();
}

// ========== Collision Detection ==========
function isColliding(r1, r2) {
    return !(
        r1.x > r2.x + r2.w ||
        r1.x + r1.w < r2.x ||
        r1.y > r2.y + r2.h ||
        r1.y + r1.h < r2.y
    );
}

// ========== Update ==========
function update() {
    if (gameover || paused) return;

    ship.update();

    // Update bullets
    ship.bullets.forEach(b => b.update());
    ship.bullets = ship.bullets.filter(b => b.state === "active");

    // Update enemies
    enemies.forEach(e => e.update());
    enemies = enemies.filter(e => e.state === "active");

    // Bullet-Enemy collision
    ship.bullets.forEach(b => {
        enemies.forEach(e => {
            if (isColliding(b, e)) {
                b.state = "inactive";
                e.state = "inactive";
                score += 10;

                // Increase difficulty every 100 points
                if (score % 100 === 0) {
                    level++;
                }
            }
        });
    });

    // Ship-Enemy collision
    enemies.forEach(e => {
        if (isColliding(ship, e)) {
            e.state = "inactive";
            lives--;
            if (lives <= 0) {
                gameover = true;
            }
        }
    });

    // Spawn new enemies randomly
    if (Math.random() < 0.02) {
        let x = Math.floor(Math.random() * (W - 50));
        let speed = Math.random() * 4 + 2;
        enemies.push(new Enemy(x, 20, speed));
    }
}

// ========== Draw ==========
function draw() {
    pen.clearRect(0, 0, W, H);

    // Ship
    ship.draw();

    // Bullets
    ship.bullets.forEach(b => b.draw());

    // Enemies
    enemies.forEach(e => e.draw());

    // HUD
    pen.fillStyle = "white";
    pen.font = "20px Arial";
    pen.fillText("Score: " + score, 20, 30);
    pen.fillText("Lives: " + lives, 20, 60);
    pen.fillText("Level: " + level, 20, 90);
    pen.fillText("Power-ups: " + (powerups.length ? powerups.join(", ") : "None"), 20, 120);

    if (paused) {
        pen.fillStyle = "yellow";
        pen.font = "40px Arial";
        pen.fillText("PAUSED", W / 2 - 80, H / 2);
    }

    if (gameover) {
        pen.fillStyle = "red";
        pen.font = "50px Arial";
        pen.fillText("GAME OVER", W / 2 - 150, H / 2);
        pen.font = "25px Arial";
        pen.fillText("Press R to Restart", W / 2 - 120, H / 2 + 50);
    }
}

// ========== Game Loop ==========
function render() {
    draw();
    update();
    if (!gameover) {
        window.requestAnimationFrame(render);
    }
}

// ========== Start ==========
function startGame() {
    init();
    render();
}

startGame();
