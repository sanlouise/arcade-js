var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 120 + 15);
    this.sprite = 'images/enemy-bug.png';
};

//Player Class
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

var bug1 = new Enemy(100,62,80);
var bug2 = new Enemy(350,150,130);
var bug3 = new Enemy(450,230,200);

Enemy.prototype.update = function(dt) {
    if(this.x <= 505){
        this.x += this.speed * dt;
    } else {
        this.x = -2;
    }

    //Handles collision with the Player
    if(player.x >= this.x - 25 && player.x <= this.x + 25){
        if(player.y >= this.y - 25 && player.y <= this.y + 25){
            console.log("Hit!")
            player.reset();
        }
    }
};        
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function(){

    if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 50;

    }else if(this.ctlKey === 'left' && this.x > 0){ 
        this.x = this.x - 50;

    }else if(this.ctlKey === 'up'){
        this.y = this.y - 50;

    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 50;
    }
    //This ensures that the player does go bounce around the screen.
    this.ctlKey = null;
    
    //Reset when the player touches the water.
    if(this.y < 25){
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Receives user input, allowedKeys (the key which was pressed) and move the player according to that input
Player.prototype.handleInput = function(e){
    this.ctlKey = e;    
};

//User is reset into starting position.
Player.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
};

var allEnemies = [bug1, bug2, bug3];
var player = new Player(); 


// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
