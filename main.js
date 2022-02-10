(function(){ // Esta funcion anonima hace referencia a crear una clase Board --> Vista
    self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = { //Se crean funciones o metodos para el proto de la clase Board
        get elements(){
            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements; //Retorna las barras y la pelota 
        }
    }
})();

(function(){
    self.Ball = function(x,y,radius,board){ // Se crea la clase BALL
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3;

        board.ball = this;
        this.kind = "circle";
    }
    
    self.Ball.prototype = { //Se crea la funcion de mover la pelota.
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);
        },
        get width(){
            return this.radius*2; 
        },
        get height(){
            return this.radius*2;
        },

        collision: function(bar){
            //Reacciona a la colision con una barra que recibe como parametro
            var relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);
        
            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
        
            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);
        
            if (this.x > (this.board.width / 2)) this.direction = -1;
            else this.direction = 1;
        }
    }
})();


(function(){ //Clase para crear objetos dentro del board.
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10; //Se creo la variable speed para sumar o restar esta cantidad a la posición
    }

    self.Bar.prototype = { //Se crea para subir o bajar el objeto creado con la clase Bar.
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + " y: " + this.y ;
        }
    }
})();

(function(){  //Se crea clase para dibujar en pantalla.
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = { //Se crea para llamar la funcion draw y parsarle los elementos.
        clean: function(){
            this.ctx.clearRect(0,0,board.width,board.height);
        },
        draw: function(){
            for(var i = this.board.elements.length -1; i>= 0; i--){
                var el = this.board.elements[i];
                draw(this.ctx,el);
            }
        },
        check_collisions: function(){
            for(var i = this.board.bars.length -1; i >= 0; i--){
                var bar = this.board.bars[i];
                if(hit(bar, this.board.ball)){
                    this.board.ball.collision(bar);   
                }
            }
        },
        play : function(){
            if(this.board.playing){
                this.clean();
                this.draw();
                this.check_collisions();
                this.board.ball.move();
            }
        }
    }

    function hit(a,b){
        //Revisa si a colisiona con b
        var hit = false;
        //Colisiones hirizontales
        if(b.x + b.width >= a.x && b.x < a.x + a.width){

            //Colisiona verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height) 
                hit = true;
            }

            //Colisión de a con b
            if(b.x <= a.x && b.x + b.width >= a.x + a.width){
            
            if (b.y <= a.y && b.y + b.height >= a.y + a.height) 
                hit = true;
            }

            //Colision b con a
            if(a.x <= b.x && a.x + a.width >= b.x + b.width){
            //Colisiona verticales
            if (a.y <= b.y && a.y + a.height >= b.y + b.height) 
                hit = true;
        }
        return hit;
    }

    function draw(ctx,element){ //Dibuja el elemento.        
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x,element.y, element.radius,0,7);
                ctx.fill();
                ctx.closePath();
                break;
            }
    
    }

    
})();

var board = new Board(800,400); //Se instancia y se le dan los parametros de la clase board
var bar = new Bar(20,100,40,100,board); //Se crea el objeto bar para crear el rectangulo
var bar_2 = new Bar(735,100,40,100,board); //Se crea el objeto bar para crear el rectangulo
var canvas = document.getElementById('canvas'); //Se obtiene el elemento canvas del html
var board_view = new BoardView(canvas,board); //Se instancia la clase BoardView y se utiliza el controlador.
var ball = new Ball(350,100,10, board); //Se instancia la clase Ball 

document.addEventListener("keydown",function(ev){
    
    if(ev.keyCode === 38) {
        ev.preventDefault();
        bar.up();
    }else if (ev.keyCode === 40){
        ev.preventDefault();
        bar.down();
    }
    // Tecla W
    else if (ev.keyCode === 87){ 
        ev.preventDefault();
        bar_2.up();
    }//Tecla S
    else if (ev.keyCode === 83){
        ev.preventDefault();
        bar_2.down();
    }else if (ev.keyCode === 32){ //Se agrega la pausa.
        ev.preventDefault;
        board.playing = !board.playing;
    }
});

window.requestAnimationFrame(controller);
setTimeout(function(){
    ball.direction = -1;
},4000);

function controller(){
    board_view.play();
    window.requestAnimationFrame(controller);

}

