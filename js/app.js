
// Enemy Class
var Enemy = function() {
    //Loading the image by setting this.sprite to the appropriate image in the image folder
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // Add random speed to the enemy bugs.
    this.speed = Math.floor((Math.random() * 200) + 50);
};

Enemy.prototype.update = function(dt) {
    //Once the bug leaves the screen, the object will be reset.
    if(this.x <= 505){
        this.x += this.speed * dt;
    }else{
        this.x = -2;
    };

    //Handles collision with the Player
    if(player.x >= this.x - 25 && player.x <= this.x + 25){
        if(player.y >= this.y - 25 && player.y <= this.y + 25){
            this.reset();
        }
    };
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player Class
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
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

// Instantiation of objects.
var player = new Player(); 
var allEnemies = [];

function addEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,220));
};


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
